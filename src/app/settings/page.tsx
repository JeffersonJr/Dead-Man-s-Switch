'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Users, Save, Trash2, Plus, MessageSquare, Phone, Mail, User, Shield, ArrowLeft } from 'lucide-react'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [targets, setTargets] = useState<any[]>([])
    const [profile, setProfile] = useState<any>(null)
    const [mounted, setMounted] = useState(false)

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
        const fetchData = async () => {
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
            setProfile(profile)

            const { data: targets } = await supabase
                .from('notification_targets')
                .select('*')
                .eq('user_id', user.id)
            setTargets(targets || [])

            setLoading(false)
        }
        fetchData()
    }, [supabase, router])

    const handleUpdateTarget = (id: string, field: string, value: any) => {
        setTargets(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t))
    }

    const handleSaveTarget = async (id: string) => {
        const target = targets.find(t => t.id === id)
        if (!target) return

        setSaving(true)
        const { error } = await supabase
            .from('notification_targets')
            .update({
                target_name: target.target_name,
                destination_value: target.destination_value,
                message: target.message,
                enabled: target.enabled
            })
            .eq('id', id)

        if (error) alert(error.message)
        setSaving(false)
    }

    const handleDeleteTarget = async (id: string) => {
        if (!confirm('PROTOCOL ECHO: Delete contact data?')) return

        const { error } = await supabase
            .from('notification_targets')
            .delete()
            .eq('id', id)

        if (!error) {
            setTargets(prev => prev.filter(t => t.id !== id))
        }
    }

    const handleAddTarget = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
            .from('notification_targets')
            .insert({
                user_id: user.id,
                type: 'whatsapp',
                target_name: 'NEW CONTACT',
                destination_value: '',
                message: 'SYSTEM WARNING: Only 10 minutes remaining. Reset requested immediately.'
            })
            .select()
            .single()

        if (!error && data) {
            setTargets([...targets, data])
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-[#00ff41] font-mono crt">
            <span className="animate-pulse tracking-[0.5em] text-2xl uppercase">SYNCING TERMINAL...</span>
        </div>
    )

    return (
        <main className="min-h-screen bg-black text-[#00ff41] font-mono p-4 md:p-8 crt">
            <button
                onClick={() => router.push('/dashboard')}
                className="mb-8 flex items-center gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity"
            >
                <ArrowLeft size={16} /> RETURN TO DASHBOARD
            </button>

            <div className="max-w-4xl mx-auto space-y-12 pb-24">
                {/* Profile Info */}
                <div className="border-b border-[#00ff41]/30 pb-8">
                    <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-4 mb-2">
                        <Shield className="text-[#00ff41]" /> Operator Profile
                    </h1>
                    <p className="text-[10px] opacity-50 uppercase tracking-[0.3em]">Credentials & Terminal Settings</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Full Name</label>
                                <div className="p-3 border border-[#00ff41]/20 bg-white/5">{profile?.full_name}</div>
                            </div>
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Email Registry</label>
                                <div className="p-3 border border-[#00ff41]/20 bg-white/5">{profile?.email}</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Primary Phone</label>
                                <div className="p-3 border border-[#00ff41]/20 bg-white/5">{profile?.phone || 'NON_SPECIFIED'}</div>
                            </div>
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Registry Date</label>
                                <div className="p-3 border border-[#00ff41]/20 bg-white/5">
                                    {mounted && profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '---'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Contacts */}
                <div className="space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-3">
                                <Users /> Emergency Contacts
                            </h2>
                            <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Protocol ECHO Targets</p>
                        </div>
                        <button
                            onClick={handleAddTarget}
                            className="text-[10px] border border-[#00ff41] px-4 py-2 hover:bg-[#00ff41]/10 flex items-center gap-2"
                        >
                            <Plus size={14} /> NEW ENTRY
                        </button>
                    </div>

                    <div className="space-y-6">
                        {targets.map(target => (
                            <div key={target.id} className="border border-[#00ff41]/30 p-6 bg-black/40 hover:border-[#00ff41]/60 transition-colors">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    <div className="lg:col-span-4 space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[8px] opacity-40 uppercase">Target Name</label>
                                            <input
                                                type="text"
                                                value={target.target_name || ''}
                                                onChange={(e) => handleUpdateTarget(target.id, 'target_name', e.target.value)}
                                                className="w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] opacity-40 uppercase">Destination ({target.type})</label>
                                            <input
                                                type="text"
                                                value={target.destination_value || ''}
                                                onChange={(e) => handleUpdateTarget(target.id, 'destination_value', e.target.value)}
                                                className="w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none font-mono"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 pt-4">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={target.enabled}
                                                    onChange={(e) => handleUpdateTarget(target.id, 'enabled', e.target.checked)}
                                                    className="hidden"
                                                />
                                                <div className={`w-4 h-4 border ${target.enabled ? 'bg-[#00ff41] border-[#00ff41]' : 'border-[#00ff41]/30'} flex items-center justify-center`}>
                                                    {target.enabled && <div className="w-2 h-2 bg-black" />}
                                                </div>
                                                <span className="text-[10px] uppercase opacity-70 group-hover:opacity-100">Active</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-6 space-y-1">
                                        <label className="text-[8px] opacity-40 uppercase">Custom Message</label>
                                        <textarea
                                            value={target.message || ''}
                                            onChange={(e) => handleUpdateTarget(target.id, 'message', e.target.value)}
                                            className="w-full h-24 bg-black/50 border border-[#00ff41]/20 p-3 text-xs font-mono resize-none focus:border-[#00ff41]/50 focus:outline-none"
                                        />
                                    </div>

                                    <div className="lg:col-span-2 flex lg:flex-col justify-end lg:justify-center gap-4">
                                        <button
                                            onClick={() => handleSaveTarget(target.id)}
                                            disabled={saving}
                                            className="p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all flex items-center justify-center gap-2 lg:w-full"
                                        >
                                            <Save size={16} /> <span className="text-[10px] font-bold">SAVE</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTarget(target.id)}
                                            className="p-3 border border-red-900 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 lg:w-full"
                                        >
                                            <Trash2 size={16} /> <span className="text-[10px] font-bold">DROP</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {targets.length === 0 && (
                            <div className="text-center py-12 border border-dashed border-[#00ff41]/20 opacity-30">
                                NO EMERGENCY TARGETS REGISTERED
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CRT scanline effect is applied via global css */}
        </main>
    )
}
