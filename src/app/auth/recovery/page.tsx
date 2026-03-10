'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { KeyRound, Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react'

export default function RecoveryPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const handleRecovery = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        })

        if (error) {
            alert(error.message)
            setLoading(false)
        } else {
            setSent(true)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-[#00ff41] font-mono crt">
            {/* Station Logo Watermark */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]">
                <img src="/logo.png" alt="Dharma" className="w-full h-full grayscale invert" />
            </div>

            <div className="w-full max-w-md p-8 border border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.2)] bg-black/80 relative z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-8">
                    <KeyRound size={48} className="mb-4" />
                    <h1 className="text-2xl font-black tracking-[0.2em] uppercase text-center">Security Policy Reset</h1>
                </div>

                {!sent ? (
                    <form onSubmit={handleRecovery} className="space-y-6">
                        <p className="text-[10px] opacity-70 uppercase leading-relaxed text-center">
                            Enter the identifier linked to your terminal profile.<br />
                            A reset link will be broadcast to the registered email address.
                        </p>

                        <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-[0.4em] opacity-70 flex items-center gap-2">
                                <Mail size={10} /> Terminal Identifier
                            </label>
                            <input
                                type="email"
                                placeholder="OPERATOR_EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black border border-[#00ff41] p-4 text-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41] placeholder:opacity-20 uppercase tracking-widest text-sm"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00ff41] text-black font-black p-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                            >
                                <Send size={20} /> {loading ? 'TRANSMITTING...' : 'SEND RESET LINK'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className="w-full text-[10px] uppercase tracking-[0.4em] opacity-50 hover:opacity-100 flex items-center justify-center gap-2"
                            >
                                <ArrowLeft size={16} /> Return to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center space-y-6">
                        <CheckCircle2 size={64} className="mx-auto text-[#00ff41]" />
                        <h2 className="text-xl font-bold uppercase tracking-widest">Link Transmitted</h2>
                        <p className="text-sm opacity-70 leading-relaxed">
                            Check your terminal email for further instructions.<br />
                            <span className="font-bold text-[#00ff41]">PROTOCOL R-67 INITIATED.</span>
                        </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full border border-[#00ff41] p-4 text-xs font-bold hover:bg-[#00ff41]/10"
                        >
                            RETURN TO LOGIN
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
