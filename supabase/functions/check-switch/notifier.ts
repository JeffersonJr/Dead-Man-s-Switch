// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Service Provider Pattern for Notifications
interface NotificationProvider {
    send(destination: string, message: string): Promise<boolean>
}

class EmailProvider implements NotificationProvider {
    async send(destination: string, message: string): Promise<boolean> {
        console.log(`[EmailProvider] Sending to ${destination}: ${message}`)
        // TODO: Implement Resend or SendGrid API here
        return true
    }
}

class WhatsAppProvider implements NotificationProvider {
    async send(destination: string, message: string): Promise<boolean> {
        console.log(`[WhatsAppProvider] Sending to ${destination}: ${message}`)
        // TODO: Implement Twilio or Meta API here
        return true
    }
}

export class NotificationService {
    private providers: Record<string, NotificationProvider> = {
        email: new EmailProvider(),
        whatsapp: new WhatsAppProvider(),
    }

    async triggerAlerts(userId: string, supabase: any, customMessage?: string) {
        const { data: targets, error } = await supabase
            .from('notification_targets')
            .select('*')
            .eq('user_id', userId)
            .eq('enabled', true)

        if (error) throw error

        const message = customMessage || 'SYSTEM ALERT: Dead Man Switch not reset! Protocol Echo activated.'

        for (const target of targets) {
            const provider = this.providers[target.type]
            if (provider) {
                await provider.send(
                    target.destination_value,
                    message
                )
            }
        }
    }
}
