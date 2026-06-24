import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    // 1. (Optional) Verify Cron Secret to prevent abuse. 
    // You can uncomment this if cron-job.org supports custom headers, or leave it unprotected if the route is idempotent.
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
        // Also fetch the user's name from the profiles table
        const { data: expiredCounters, error } = await supabase
            .from('counter_status')
            .select(`
                user_id,
                profiles (
                    full_name,
                    email
                )
            `)
            .lt('deadline_at', new Date().toISOString())
            .eq('email_enviado', false)

        if (error) throw error

        if (!expiredCounters || expiredCounters.length === 0) {
            return NextResponse.json({ message: 'No expired counters found' })
        }

        // 4. Process each expired user
        let processedCount = 0

        for (const counter of expiredCounters) {
            const userName = (counter.profiles as any)?.full_name || (counter.profiles as any)?.email || 'Um usuário'
            console.log(`[PROTOCOL ECHO] Triggered for user: ${userName} (${counter.user_id})`)

            // Fetch notification targets for this user
            const { data: targets } = await supabase
                .from('notification_targets')
                .select('*')
                .eq('user_id', counter.user_id)
                .eq('enabled', true)

            if (targets && targets.length > 0) {
                for (const target of targets) {
                    if (target.type === 'email') {
                        // Send Email via Resend
                        const htmlTemplate = `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <div style="background-color: #d32f2f; padding: 20px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">ALERTA CRÍTICO DE SEGURANÇA</h1>
                            </div>
                            <div style="padding: 30px; background-color: #ffffff; color: #333333; line-height: 1.6;">
                                <p style="font-size: 16px;">Olá <strong>${target.target_name || 'Contato'}</strong>,</p>
                                <p style="font-size: 16px;">Você está recebendo este e-mail automático do sistema <strong>Dead Man's Switch</strong> porque o tempo limite de verificação de segurança de <strong>${userName}</strong> chegou a zero.</p>
                                
                                <div style="background-color: #f9f9f9; border-left: 4px solid #d32f2f; padding: 15px; margin: 25px 0;">
                                    <h3 style="margin-top: 0; color: #d32f2f; font-size: 14px; text-transform: uppercase;">Mensagem Deixada:</h3>
                                    <p style="margin-bottom: 0; font-style: italic;">"${target.message || 'O usuário não deixou uma mensagem personalizada.'}"</p>
                                </div>

                                <p style="font-size: 16px;">Por favor, tente entrar em contato com esta pessoa imediatamente.</p>
                                
                                <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 30px 0;" />
                                <p style="font-size: 12px; color: #999999; text-align: center; margin: 0;">
                                    Este é um e-mail automatizado gerado pelo sistema Dead Man's Switch. Por favor, não responda.
                                </p>
                            </div>
                        </div>
                        `

                        try {
                            const data = await resend.emails.send({
                                from: 'Jefferson <alerta@dharma.evolves.site>',
                                to: target.destination_value,
                                subject: `🚨 ALERTA: Mensagem Automática de ${userName}`,
                                html: htmlTemplate,
                            })
                            console.log(`[ACTION] Email sent to ${target.destination_value}`, data)
                        } catch (err) {
                            console.error(`[ERROR] Failed to send email to ${target.destination_value}:`, err)
                        }
                    } else if (target.type === 'whatsapp') {
                        try {
                            const evolutionUrl = process.env.EVOLUTION_API_URL
                            const evolutionKey = process.env.EVOLUTION_API_KEY
                            const evolutionInstance = process.env.EVOLUTION_INSTANCE_NAME

                            if (!evolutionUrl || !evolutionKey || !evolutionInstance) {
                                console.error('[ERROR] Evolution API credentials missing.')
                                continue // Skip this target but continue with others
                            }

                            // Clean number: keep only digits
                            const cleanNumber = target.destination_value.replace(/\D/g, '')
                            
                            const whatsappMessage = `🚨 *ALERTA CRÍTICO DE SEGURANÇA* 🚨\n\nOlá *${target.target_name || 'Contato'}*,\nVocê está recebendo esta mensagem automática do *Dead Man's Switch* porque o tempo limite de verificação de *${userName}* chegou a zero.\n\n*Mensagem Deixada:*\n"${target.message || 'O usuário não deixou uma mensagem personalizada.'}"\n\nPor favor, tente entrar em contato imediatamente.`

                            const response = await fetch(`${evolutionUrl}/message/sendText/${evolutionInstance}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'apikey': evolutionKey
                                },
                                body: JSON.stringify({
                                    number: cleanNumber,
                                    text: whatsappMessage
                                })
                            })

                            if (!response.ok) {
                                const errorText = await response.text()
                                throw new Error(`Evolution API error: ${response.status} - ${errorText}`)
                            }

                            console.log(`[ACTION] WhatsApp sent to ${cleanNumber}`)
                        } catch (err) {
                            console.error(`[ERROR] Failed to send WhatsApp to ${target.destination_value}:`, err)
                        }
                    }
                }
            } else {
                console.log(`[WARNING] No active targets found for user ${counter.user_id}`)
            }

            // Mark as sent so we don't trigger it again
            await supabase
                .from('counter_status')
                .update({ email_enviado: true })
                .eq('user_id', counter.user_id)
            
            processedCount++
        }

        return NextResponse.json({ 
            success: true, 
            processed: processedCount 
        })
    } catch (err: any) {
        console.error('Timer check failed:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
