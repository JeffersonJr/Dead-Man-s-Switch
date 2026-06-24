import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ error: 'Chave do Resend não encontrada no .env.local' }, { status: 500 })
        }
        
        const resend = new Resend(process.env.RESEND_API_KEY)
        const { email } = await request.json()

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
        }

        const { data, error } = await resend.emails.send({
            from: 'Jefferson <alerta@dharma.evolves.site>',
            to: email,
            subject: 'Teste de Envio - Dead Man\'s Switch',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #00ff41; padding: 20px; text-align: center;">
                        <h1 style="color: #000000; margin: 0; font-size: 24px;">TESTE DE CONEXÃO BEM-SUCEDIDO</h1>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff; color: #333333; line-height: 1.6;">
                        <p style="font-size: 16px;">Olá!</p>
                        <p style="font-size: 16px;">Este é um <strong>Teste de envio</strong> do sistema Dead Man's Switch.</p>
                        <p style="font-size: 16px;">Se você recebeu este e-mail, significa que o destino está configurado e validado corretamente em sua conta.</p>
                        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 30px 0;" />
                        <p style="font-size: 12px; color: #999999; text-align: center; margin: 0;">
                            Dead Man's Switch System
                        </p>
                    </div>
                </div>
            `,
        })

        if (error) {
            console.error('[Resend Error] Falha detalhada no envio:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (err: any) {
        console.error('Test email failed:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
