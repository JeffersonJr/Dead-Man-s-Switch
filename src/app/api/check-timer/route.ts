import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    // 1. Verify Vercel Cron Secret (Optional but recommended to prevent abuse)
    const authHeader = request.headers.get('authorization')
    if (
        process.env.CRON_SECRET && 
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Initialize Supabase with Service Role Key to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
        return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    try {
        // 3. Find all users whose deadline has passed AND email hasn't been sent yet
        const { data: expiredCounters, error } = await supabase
            .from('counter_status')
            .select('user_id')
            .lt('deadline_at', new Date().toISOString())
            .eq('email_enviado', false)

        if (error) throw error

        if (!expiredCounters || expiredCounters.length === 0) {
            return NextResponse.json({ message: 'No expired counters found' })
        }

        // 4. Process each expired user
        for (const counter of expiredCounters) {
            console.log(`[PROTOCOL ECHO] Triggered for user: ${counter.user_id}`)

            // Fetch notification targets for this user
            const { data: targets } = await supabase
                .from('notification_targets')
                .select('*')
                .eq('user_id', counter.user_id)
                .eq('enabled', true)

            if (targets && targets.length > 0) {
                for (const target of targets) {
                    // TODO: Implement actual Email/WhatsApp provider logic here
                    // e.g. await resend.emails.send({...}) or Twilio API
                    console.log(`[ACTION] Sending ${target.type} to ${target.destination_value}`)
                    console.log(`[MESSAGE] ${target.message}`)
                }
            } else {
                console.log(`[WARNING] No active targets found for user ${counter.user_id}`)
            }

            // Mark as sent so we don't trigger it again
            await supabase
                .from('counter_status')
                .update({ email_enviado: true })
                .eq('user_id', counter.user_id)
        }

        return NextResponse.json({ 
            success: true, 
            processed: expiredCounters.length 
        })
    } catch (err: any) {
        console.error('Timer check failed:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
