import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const telegramToken = process.env.TELEGRAM_BOT_TOKEN
        const telegramChatId = process.env.TELEGRAM_CHAT_ID

        if (!telegramToken || !telegramChatId) {
            return NextResponse.json({ 
                error: 'Chaves TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID ausentes no .env.local.' 
            }, { status: 400 })
        }

        const message = 'Nível de segurança ativo: Integração do Telegram com o projeto Dharma realizada com sucesso!\n\nAcesse: https://dharma.evolves.site/dashboard'

        const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            return NextResponse.json({ 
                error: `Erro na API do Telegram (Status ${response.status}): ${errorText}` 
            }, { status: 500 })
        }

        return NextResponse.json({ success: true, message: 'Teste do Telegram enviado com sucesso!' })
    } catch (err: any) {
        console.error('Erro ao testar Telegram:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
