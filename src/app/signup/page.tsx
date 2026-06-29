'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { UserPlus, ArrowRight, ArrowLeft, Mail, Phone, User, CheckCircle2 } from 'lucide-react'
import { SystemModal } from '@/components/SystemModal'

export default function SignupPage() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        phone: ''
    })
    const [modal, setModal] = useState<{open:boolean,title:string,message:string}>({open:false,title:'',message:''})
    const closeModal = () => setModal(m => ({...m, open:false}))
    const supabase = createClient()
    const router = useRouter()

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(step + 1)
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.fullName,
                    phone: formData.phone
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (error) {
            setModal({open:true, title:'ERRO NO CADASTRO', message:error.message})
            setLoading(false)
        } else {
            setStep(4) // Success step
        }
    }

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-[#00ff41] font-mono crt">
            <SystemModal open={modal.open} title={modal.title} message={modal.message} type="error" variant="alert" onConfirm={closeModal} />
            {/* Station Logo Watermark */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]">
                <img src="/logo.png" alt="Dharma" className="w-full h-full grayscale invert" />
            </div>

            <div className="w-full max-w-md p-8 border border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.2)] bg-black/80 relative z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-8">
                    <img src="/logo.png" alt="Dharma" className="w-16 h-16 mb-4 grayscale invert" />
                    <h1 className="text-2xl font-black tracking-[0.2em] uppercase text-center">New Operator Enrollment</h1>
                    <div className="mt-4 flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1 w-8 ${step >= i ? 'bg-[#00ff41]' : 'bg-[#00ff41]/20'}`} />
                        ))}
                    </div>
                </div>

                {step === 1 && (
                    <form onSubmit={handleNext} className="space-y-6">
                        <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-[0.4em] opacity-70 flex items-center gap-2">
                                <Mail size={10} /> Email Registry
                            </label>
                            <input
                                type="email"
                                placeholder="OPERATOR_EMAIL"
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                className="w-full bg-black border border-[#00ff41] p-4 text-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41] placeholder:opacity-20 uppercase tracking-widest text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-[0.4em] opacity-70">Security Passcode</label>
                            <input
                                type="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => updateField('password', e.target.value)}
                                className="w-full bg-black border border-[#00ff41] p-4 text-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41] placeholder:opacity-20 tracking-widest text-sm"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#00ff41] text-black font-black p-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                            CONTINUED <ArrowRight size={20} />
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleNext} className="space-y-6">
                        <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-[0.4em] opacity-70 flex items-center gap-2">
                                <User size={10} /> Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="OPERATOR_NAME"
                                value={formData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                className="w-full bg-black border border-[#00ff41] p-4 text-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41] placeholder:opacity-20 uppercase tracking-widest text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-[0.4em] opacity-70 flex items-center gap-2">
                                <Phone size={10} /> Primary Link (Phone)
                            </label>
                            <input
                                type="tel"
                                placeholder="+55 00 90000-0000"
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                className="w-full bg-black border border-[#00ff41] p-4 text-[#00ff41] focus:outline-none focus:ring-1 focus:ring-[#00ff41] placeholder:opacity-20 tracking-widest text-sm"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setStep(1)} className="flex-1 border border-[#00ff41] p-4 flex items-center justify-center gap-3 opacity-60 hover:opacity-100 transition-all">
                                <ArrowLeft size={20} /> BACK
                            </button>
                            <button type="submit" className="flex-[2] bg-[#00ff41] text-black font-black p-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                                REVIEW <ArrowRight size={20} />
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div className="space-y-8">
                        <div className="space-y-4 border border-[#00ff41]/30 p-4 text-xs">
                            <h3 className="text-[#00ff41] font-bold text-sm border-b border-[#00ff41]/30 pb-2">REGISTRY DATA REVIEW</h3>
                            <p><span className="opacity-50">EMAIL:</span> {formData.email}</p>
                            <p><span className="opacity-50">NAME:</span> {formData.fullName}</p>
                            <p><span className="opacity-50">PHONE:</span> {formData.phone}</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleSignup}
                                disabled={loading}
                                className="w-full bg-[#00ff41] text-black font-black p-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98] animate-pulse"
                            >
                                <UserPlus size={20} /> {loading ? 'TRANSMITTING...' : 'INITIATE ENROLLMENT'}
                            </button>
                            <button type="button" onClick={() => setStep(2)} className="w-full text-[10px] uppercase tracking-[0.4em] opacity-50 hover:opacity-100">
                                Revision Required
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center space-y-6">
                        <CheckCircle2 size={64} className="mx-auto text-[#00ff41] animate-bounce" />
                        <h2 className="text-xl font-bold uppercase tracking-widest">Enrollment Initiated</h2>
                        <p className="text-sm opacity-70 leading-relaxed">
                            A verification link has been transmitted to your registry email.<br />
                            <span className="font-bold text-[#00ff41]">PLEASE CONFIRM YOUR IDENTITY TO COMMENCE ONBOARDING.</span>
                        </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full border border-[#00ff41] p-4 text-xs font-bold hover:bg-[#00ff41]/10"
                        >
                            RETURN TO TERMINAL
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8 text-[8px] opacity-30 uppercase tracking-[0.4em] max-w-xs text-center">
                Operator credentials are restricted. unauthorized access attempts will be logged by station 3.
            </div>
        </div>
    )
}
