import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { user_id } = body

        if (!user_id) {
            return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
        }

        const resend = new Resend(process.env.RESEND_API_KEY)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase environment variables not set.')
        }

        const supabase = createClient(supabaseUrl, supabaseKey)

        // Fetch User Profile to get Name and Location
        const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, realtime_location_link')
            .eq('user_id', user_id)
            .single()

        const userName = profile?.full_name || profile?.email || 'Usuário Desconhecido'
        const locationLink = profile?.realtime_location_link
        
        console.log('--- INICIANDO GATILHO DE PÂNICO ---')
        console.log('Usuário:', userName)
        console.log('Link de rastreamento encontrado:', locationLink || 'Nenhum')
        
        const locationText = locationLink ? `\n\n📍 Rastreamento em tempo real: ${locationLink}` : ''
        const locationHtml = locationLink ? `<br><br>📍 <strong>Rastreamento em tempo real:</strong> <a href="${locationLink}" style="color: #d32f2f;">${locationLink}</a>` : ''

        // Fetch user's notification targets
        const { data: targets, error: targetError } = await supabase
            .from('notification_targets')
            .select('*')
            .eq('user_id', user_id)
            .eq('enabled', true)

        if (targetError) {
            console.error('ERRO FATAL ao buscar contatos no Supabase:', targetError)
            throw targetError
        }

        console.log('Contatos encontrados na tabela notification_targets:', targets?.length || 0)

        let processedCount = 0

        if (targets && targets.length > 0) {
            for (const target of targets) {
                console.log(`\nProcessando contato: ${target.target_name} (${target.type})`)
                if (target.type === 'email') {
                    console.log(`Tentando disparar E-mail para: ${target.destination_value}...`)
                    // Send Email via Resend
                    const htmlTemplate = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <div style="background-color: #d32f2f; padding: 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">ALERTA CRÍTICO DE SEGURANÇA</h1>
                        </div>
                        <div style="padding: 30px; background-color: #ffffff; color: #333333; line-height: 1.6;">
                            <p style="font-size: 16px;">Olá <strong>${target.target_name || 'Contato'}</strong>,</p>
                            <p style="font-size: 16px;">Você está recebendo este e-mail automático do sistema <strong>Dead Man's Switch</strong> porque o gatilho manual de PÂNICO de <strong>${userName}</strong> foi ativado.</p>
                            
                            <div style="background-color: #f9f9f9; border-left: 4px solid #d32f2f; padding: 15px; margin: 25px 0;">
                                <h3 style="margin-top: 0; color: #d32f2f; font-size: 14px; text-transform: uppercase;">Mensagem Deixada:</h3>
                                <p style="margin-bottom: 0; font-style: italic;">"${target.message || 'O usuário não deixou uma mensagem personalizada.'}"</p>
                            </div>

                            <p style="font-size: 16px;">Por favor, tente entrar em contato com esta pessoa imediatamente.</p>
                            ${locationHtml}
                            
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
                                subject: `🚨 ALERTA DE PÂNICO: Mensagem de ${userName}`,
                                html: htmlTemplate,
                            })
                            console.log(`[PANIC ACTION] SUCESSO! E-mail enviado para ${target.destination_value}`, data)
                            processedCount++
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

                        const telegramMessage = `🚨 *ALERTA CRÍTICO DE SEGURANÇA (PÂNICO)* 🚨\n\nOlá *${target.target_name || 'Contato'}*,\nVocê está recebendo esta mensagem automática do *Dead Man's Switch* porque o gatilho manual de PÂNICO de *${userName}* foi ativado.\n\n*Mensagem Deixada:*\n"${target.message || 'O usuário não deixou uma mensagem personalizada.'}"\n\nPor favor, tente entrar em contato imediatamente.${locationText}`

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

                        console.log(`[PANIC ACTION] SUCESSO! Telegram enviado para ${target.destination_value}`)
                        processedCount++
                    } catch (err) {
                        console.error(`ERRO FATAL ao tentar enviar Telegram para ${target.destination_value}:`, err)
                    }
                } else {
                    console.log(`Tipo de contato não suportado/ignorado: ${target.type}`)
                }
            }
        }

        // We do NOT update the counter_status table to avoid interfering with the actual timer.

        return NextResponse.json({ 
            success: true, 
            processed: processedCount 
        })
    } catch (err: any) {
        console.error('ERRO FATAL: Falha geral no trigger-panic:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
