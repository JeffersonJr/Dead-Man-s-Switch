// @ts-nocheck
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { NotificationService } from './notifier.ts'

serve(async (req) => {
    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const notifier = new NotificationService()

        // 1. Fetch expired switches
        // Check if last_reset_at + target_time_interval < now
        const { data: expiredSwitches, error } = await supabase
            .from('counter_status')
            .select('*, profiles(email)')
            .eq('is_active', true)
            .filter('last_reset_at', 'lt', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

        if (error) throw error

        console.log(`Found ${expiredSwitches?.length} expired switches.`)

        for (const entry of expiredSwitches || []) {
            console.log(`Triggering alerts for user: ${entry.user_id}`)
            await notifier.triggerAlerts(entry.user_id, supabase)

            // Optionally mark as inactive or log the failure
            /*
            await supabase
              .from('counter_status')
              .update({ is_active: false })
              .eq('id', entry.id)
            */
        }

        return new Response(JSON.stringify({ success: true, count: expiredSwitches?.length }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
})
