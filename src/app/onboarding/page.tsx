'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { UserPlus, Save, Users, MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react'

export default function OnboardingPage() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState<any>(null)
    const [contacts, setContacts] = useState([
        { name: '', email: '', phone: '', message: 'SYSTEM WARNING: Only 10 minutes remaining. Reset requested immediately.' },
        { name: '', email: '', phone: '', message: 'SYSTEM WARNING: Only 10 minutes remaining. Reset requested immediately.' },
        { name: '', email: '', phone: '', message: 'SYSTEM WARNING: Only 10 minutes remaining. Reset requested immediately.' }
    ])

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id)
                .single()

            if (profile?.onboarding_completed) {
                router.push('/dashboard')
            } else {
                setProfile(profile)
            }
        }
        checkUser()
    }, [supabase, router])

    const updateContact = (index: number, field: string, value: string) => {
        const newContacts = [...contacts]
        newContacts[index] = { ...newContacts[index], [field]: value }
        setContacts(newContacts)
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            // Save each contact as a notification target
            for (const contact of contacts) {
                // Email target
                if (contact.email) {
                    await supabase.from('notification_targets').insert({
                        user_id: profile.user_id,
                        type: 'email',
                        destination_value: contact.email,
                        target_name: contact.name,
                        message: contact.message
                    })
                }

                // Telegram target
                if (contact.phone) {
                    await supabase.from('notification_targets').insert({
                        user_id: profile.user_id,
                        type: 'telegram',
                        destination_value: contact.phone,
                        target_name: contact.name,
                        message: contact.message
                    })
                }
            }

            // Mark onboarding as completed
            await supabase
                .from('profiles')
                .update({ onboarding_completed: true })
                .eq('user_id', profile.user_id)

            router.push('/dashboard')
        } catch (error) {
            console.error(error)
            alert('Failed to transmit configuration.')
            setLoading(false)
        }
    }

    if (!profile) return null

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-[#00ff41] font-mono crt">
            {/* Background Station Logo */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[600px] h-[600px]">
                <img src="/logo.png" alt="Dharma" className="w-full h-full grayscale invert" />
            </div>

            <div className="w-full max-w-2xl p-8 border border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.2)] bg-black/80 relative z-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <img src="/logo.png" alt="Dharma" className="w-20 h-20 mb-6 grayscale invert" />
                    <h1 className="text-3xl font-black tracking-[0.2em] uppercase">Operator Onboarding</h1>
                    <p className="text-xs opacity-60 mt-2 uppercase tracking-widest">Configure Station Emergency Contacts</p>
                    <div className="mt-8 flex gap-4 w-full">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`flex-1 h-2 ${step > i ? 'bg-[#00ff41]' : step === i ? 'bg-[#00ff41] animate-pulse' : 'bg-[#00ff41]/10'}`} />
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="border border-[#00ff41]/30 p-6 bg-black/40">
                        <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-3">
                            <Users /> Contact {step} of 3
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase opacity-50 flex items-center gap-2"><Users size={10} /> Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="CONTACT_NAME"
                                        value={contacts[step - 1].name}
                                        onChange={(e) => updateContact(step - 1, 'name', e.target.value)}
                                        className="w-full bg-black border border-[#00ff41]/50 p-3 text-sm focus:border-[#00ff41] transition-all focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase opacity-50 flex items-center gap-2"><Mail size={10} /> Email Registry</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        value={contacts[step - 1].email}
                                        onChange={(e) => updateContact(step - 1, 'email', e.target.value)}
                                        className="w-full bg-black border border-[#00ff41]/50 p-3 text-sm focus:border-[#00ff41] transition-all focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase opacity-50 flex items-center gap-2"><Phone size={10} /> Telegram Chat ID</label>
                                    <input
                                        type="tel"
                                        placeholder="+55 11 90000 0000"
                                        value={contacts[step - 1].phone}
                                        onChange={(e) => updateContact(step - 1, 'phone', e.target.value)}
                                        className="w-full bg-black border border-[#00ff41]/50 p-3 text-sm focus:border-[#00ff41] transition-all focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase opacity-50 flex items-center gap-2"><MessageSquare size={10} /> Emergency Message</label>
                                <textarea
                                    value={contacts[step - 1].message}
                                    onChange={(e) => updateContact(step - 1, 'message', e.target.value)}
                                    className="w-full h-[167px] bg-black border border-[#00ff41]/50 p-4 text-xs font-mono resize-none focus:border-[#00ff41] transition-all focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <p className="text-[10px] opacity-40 max-w-[50%]">
                            CONTACTS WILL BE NOTIFIED IN THE EVENT OF PRIMARY OPERATOR UNRESPONSIVENESS.
                        </p>

                        {step < 3 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={!contacts[step - 1].name || (!contacts[step - 1].email && !contacts[step - 1].phone)}
                                className="bg-[#00ff41] text-black font-black px-8 py-4 flex items-center gap-3 disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
                            >
                                NEXT CONTACT <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !contacts[step - 1].name || (!contacts[step - 1].email && !contacts[step - 1].phone)}
                                className="bg-[#00ff41] text-black font-black px-8 py-4 flex items-center gap-3 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 animate-pulse"
                            >
                                <Save size={20} /> {loading ? 'SAVING...' : 'FINALIZE STATION SETUP'}
                            </button>
                        )}
                    </div>

                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="text-[10px] uppercase opacity-30 hover:opacity-100 transition-opacity"
                        >
                            Return to Previous Entry
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
