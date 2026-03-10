'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ShieldCheck, LogIn } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            alert(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
        }
    }

    const handleSignUp = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: email.split('@')[0]
                }
            }
        })
        if (error) alert(error.message)
        else alert('Check your email for confirmation!')
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-[#00ff41] font-mono crt">
            {/* Station Logo Watermark */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]">
                <img src="/logo.png" alt="Dharma" className="w-full h-full grayscale invert" />
            </div>

            <div className="w-full max-w-md p-8 border border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.2)] bg-black/80 relative z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-10">
                    <img src="/logo.png" alt="Dharma" className="w-24 h-24 mb-6 grayscale invert animate-pulse" />
                    <h1 className="text-3xl font-black tracking-[0.3em] uppercase glow-text text-center leading-tight">
                        Dharma Initiative<br />
                        <span className="text-sm opacity-60 tracking-[0.5em]">The Swan Station</span>
                    </h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-[0.4em] opacity-70">Identifier</label>
                        <input
                            type="email"
                            placeholder="OPERATOR_EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-[#00ff41] p-4 text-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41] placeholder:opacity-20 uppercase tracking-widest text-sm"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-[0.4em] opacity-70">Security Passcode</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-[#00ff41] p-4 text-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41] placeholder:opacity-20 tracking-widest text-sm"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#00ff41] text-black font-black p-4 hover:bg-[#00cc33] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            <LogIn size={20} /> {loading ? 'PROCESSING...' : 'INITIATE ACCESS'}
                        </button>

                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => router.push('/auth/recovery')}
                                className="text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity text-center"
                            >
                                Forgot Security Passcode?
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/signup')}
                                className="w-full border border-[#00ff41] p-3 hover:bg-[rgba(0,255,65,0.1)] transition-colors text-[10px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100"
                            >
                                REGISTER NEW OPERATOR
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-8 text-center text-[8px] opacity-30 uppercase tracking-[0.4em]">
                    Property of Dharma Initiative • Station 3: The Swan
                </div>
            </div>
        </div>
    )
}
