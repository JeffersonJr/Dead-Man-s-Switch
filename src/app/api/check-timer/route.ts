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
        const now = new Date()
        const tenMinsFromNow = new Date(now.getTime() + 10 * 60000)

        // 3. Find all users whose deadline is <= 10 mins from now AND email hasn't been sent yet
        const { data: activeCounters, error } = await supabase
            .from('counter_status')
            .select(`
                user_id,
                deadline_at,
                email_enviado,
                warning_10m_sent,
                profiles (
                    full_name,
                    email,
                    realtime_location_link
                )
            `)
            .lte('deadline_at', tenMinsFromNow.toISOString())
            .eq('email_enviado', false)

        if (error) throw error

        if (!activeCounters || activeCounters.length === 0) {
            return NextResponse.json({ message: 'No counters expiring soon or expired' })
        }

        // 4. Process each user
        let processedCount = 0

        for (const counter of activeCounters) {
            const profile = counter.profiles as any
            const userName = profile?.full_name || profile?.email || 'Um usuário'
            const locationLink = profile?.realtime_location_link
            
            const locationText = locationLink ? `\n\n📍 Rastreamento em tempo real: ${locationLink}` : ''
            const locationHtml = locationLink ? `<br><br>📍 <strong>Rastreamento em tempo real:</strong> <a href="${locationLink}" style="color: #d32f2f;">${locationLink}</a>` : ''
            
            const deadline = new Date(counter.deadline_at)
            const timeDiffMs = deadline.getTime() - now.getTime()
            const timeDiffMins = timeDiffMs / 60000

            console.log(`[DEBUG TIME] User: ${userName} | Now (Server): ${now.toISOString()} | Deadline (Supabase): ${deadline.toISOString()} | Diff(mins): ${timeDiffMins.toFixed(2)}`)

            if (timeDiffMins <= 0) {
                console.log(`[PROTOCOL ECHO] Triggered FINAL ALERT for user: ${userName} (${counter.user_id})`)

                // Fetch notification targets for this user
            const { data: targets, error: targetError } = await supabase
                .from('notification_targets')
                .select('*')
                .eq('user_id', counter.user_id)
                .eq('enabled', true)

            if (targetError) {
                console.error('ERRO FATAL ao buscar contatos no Supabase para check-timer:', targetError)
            }

            console.log(`Contatos habilitados encontrados:`, targets?.length || 0)
            console.log(`Link de rastreamento:`, locationLink || 'Nenhum')

            if (targets && targets.length > 0) {
                // Helper: replace dynamic tags in message
                const now_br = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                const date_br = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                const time_br = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                const resolveTags = (msg: string, targetName: string) => msg
                    .replace(/\{\{nome\}\}/g, targetName)
                    .replace(/\{\{data\}\}/g, date_br)
                    .replace(/\{\{hora\}\}/g, time_br)

                for (const target of targets) {
                    console.log(`\nProcessando contato: ${target.target_name} (${target.type})`)
                    if (target.type === 'email') {
                        console.log(`Tentando disparar E-mail para: ${target.destination_value}`)
                        // Send Email via Resend — message is HTML, tags resolved
                        const rawMsg = resolveTags(target.message || '', target.target_name || 'Contato')
                        const htmlTemplate = `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <div style="background-color: #d32f2f; padding: 20px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🚨 MENSAGEM DE EMERGÊNCIA</h1>
                            </div>
                            <div style="padding: 30px; background-color: #ffffff; color: #333333; line-height: 1.8; font-size: 16px;">
                                ${rawMsg}
                                ${locationHtml}
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
                            console.log(`[ACTION] SUCESSO! E-mail enviado para ${target.destination_value}`, data)
                        } catch (err) {
                            console.error(`ERRO FATAL ao tentar enviar E-mail para ${target.destination_value}:`, err)
                        }
                    } else if (target.type === 'telegram') {
                        console.log(`Tentando disparar Telegram para: ${target.destination_value}...`)
                        try {
                            const telegramToken = process.env.TELEGRAM_BOT_TOKEN
                            if (!telegramToken) {
                                console.error('[ERROR] TELEGRAM_BOT_TOKEN missing.')
                                continue
                            }

                            const telegramMessage = `${resolveTags(target.message || '', target.target_name || 'Contato')}${locationText}`

                            const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    chat_id: target.destination_value,
                                    text: telegramMessage,
                                    parse_mode: 'Markdown'
                                })
                            })

                            if (!response.ok) {
                                const errorText = await response.text()
                                console.error(`ERRO FATAL na API do Telegram: ${response.status} - ${errorText}`)
                                throw new Error(`Telegram API error: ${response.status} - ${errorText}`)
                            }

                            console.log(`[ACTION] SUCESSO! Telegram enviado para ${target.destination_value}`)
                        } catch (err) {
                            console.error(`ERRO FATAL ao tentar enviar Telegram para ${target.destination_value}:`, err)
                        }
                    } else {
                        console.log(`Tipo de contato não suportado/ignorado: ${target.type}`)
                    }
                }
            } else {
                console.log(`[WARNING] No active targets found for user ${counter.user_id}. NOT marking as sent.`)
            }

            if (targets && targets.length > 0) {
                // Mark as sent only when we had contacts to dispatch
                await supabase
                    .from('counter_status')
                    .update({ email_enviado: true })
                    .eq('user_id', counter.user_id)
                processedCount++
            }
            } else if (timeDiffMins > 0 && timeDiffMins <= 10) {
                if (!counter.warning_10m_sent) {
                    console.log(`[PROTOCOL ECHO] Triggered 10-MIN WARNING for user: ${userName} (${counter.user_id})`)
                    
                    try {
                        const telegramToken = process.env.TELEGRAM_BOT_TOKEN
                        const telegramChatId = process.env.TELEGRAM_CHAT_ID

                        if (!telegramToken || !telegramChatId) {
                            console.error('[ERROR] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing for 10-min warning.')
                        } else {
                            const warningMessage = `⚠️ *AVISO PRÉVIO - DEAD MAN'S SWITCH* ⚠️\n\nFaltam menos de 10 minutos para o timer de *${userName}* expirar.\nPrazo final (Servidor): ${deadline.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n\nAcesse para resetar: https://dharma.evolves.site/dashboard`
                            
                            const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    chat_id: telegramChatId,
                                    text: warningMessage
                                })
                            })
                            
                            if (!response.ok) {
                                const errorText = await response.text()
                                throw new Error(`Telegram API error: ${response.status} - ${errorText}`)
                            }
                            console.log(`[ACTION] 10-min warning Telegram sent to chat ${telegramChatId}`)
                            
                            // Mark warning as sent
                            await supabase
                                .from('counter_status')
                                .update({ warning_10m_sent: true })
                                .eq('user_id', counter.user_id)
                        }
                    } catch (err) {
                        console.error(`[ERROR] Failed to send 10-min warning via Telegram:`, err)
                    }
                }
            }
        }

        return NextResponse.json({ 
            success: true, 
            processed: processedCount 
        })
    } catch (err: any) {
        console.error('ERRO FATAL: Falha geral no check-timer:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
