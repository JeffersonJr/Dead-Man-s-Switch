'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Users, Save, Trash2, Plus, ArrowLeft, Shield, Key, Smartphone, User } from 'lucide-react'

export default function SettingsPage() {
    // Basic states
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Data states
    const [targets, setTargets] = useState<any[]>([])
    const [profile, setProfile] = useState<any>(null)
    const [profileData, setProfileData] = useState({ full_name: '', email: '', phone: '' })
    const [testLoading, setTestLoading] = useState<{[key: string]: boolean}>({})
    
    // Security states
    const [passwordData, setPasswordData] = useState({ new: '', confirm: '' })
    const [savingPassword, setSavingPassword] = useState(false)

    const [mfaState, setMfaState] = useState({
        isEnrolled: false,
        factorId: '',
        qrCode: '',
        verifyCode: '',
        loading: false
    })

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

            // Profile
            const { data: profileObj } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id)
                .single()
            setProfile(profileObj)
            setProfileData({
                full_name: profileObj?.full_name || '',
                email: user.email || '',
                phone: profileObj?.phone || ''
            })

            // Targets
            const { data: targetsData } = await supabase
                .from('notification_targets')
                .select('*')
                .eq('user_id', user.id)
            setTargets(targetsData || [])

            // MFA Status
            const { data: mfaData, error: mfaError } = await supabase.auth.mfa.listFactors()
            if (!mfaError && mfaData && mfaData.totp.length > 0) {
                const verifiedFactor = mfaData.totp.find((f: any) => f.status === 'verified')
                if (verifiedFactor) {
                    setMfaState(prev => ({ ...prev, isEnrolled: true, factorId: verifiedFactor.id }))
                }
            }

            setLoading(false)
        }
        fetchData()
    }, [supabase, router])

    // --- Profile Handlers ---
    const handleSaveProfile = async () => {
        setSaving(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        let emailChanged = false;
        if (profileData.email !== user.email) {
            const { error: emailError } = await supabase.auth.updateUser({ email: profileData.email })
            if (emailError) {
                alert('Error updating email: ' + emailError.message)
            } else {
                emailChanged = true;
            }
        }

        const { error: profileError } = await supabase
            .from('profiles')
            .update({ full_name: profileData.full_name, phone: profileData.phone })
            .eq('user_id', user.id)

        if (profileError) alert('Error updating profile: ' + profileError.message)
        else {
            alert(emailChanged ? 'Profile updated! Check your email to confirm the address change.' : 'Profile updated!')
        }
        setSaving(false)
    }

    // --- Targets Handlers ---
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
                type: target.type,
                destination_value: target.destination_value,
                message: target.message,
                enabled: target.enabled
            })
            .eq('id', id)

        if (error) alert(error.message)
        else alert('Target saved!')
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
        if (targets.length >= 3) {
            alert('MAXIMUM TARGETS REACHED (3)')
            return
        }

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

    const handleTestEmail = async (email: string, targetId: string) => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address first.')
            return
        }
        setTestLoading(prev => ({ ...prev, [targetId]: true }))
        try {
            const res = await fetch('/api/test-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            alert('Test email sent successfully! Please check your inbox.')
        } catch (err: any) {
            alert('Failed to send test email: ' + err.message)
        } finally {
            setTestLoading(prev => ({ ...prev, [targetId]: false }))
        }
    }

    // --- Security Handlers ---
    const handleSavePassword = async () => {
        if (passwordData.new !== passwordData.confirm) {
            alert("Passwords do not match!")
            return
        }
        if (passwordData.new.length < 6) {
            alert("Password too short!")
            return
        }
        setSavingPassword(true)
        const { error } = await supabase.auth.updateUser({ password: passwordData.new })
        if (error) alert(error.message)
        else {
            alert('Password updated successfully!')
            setPasswordData({ new: '', confirm: '' })
        }
        setSavingPassword(false)
    }

    const handleEnable2FA = async () => {
        setMfaState(prev => ({ ...prev, loading: true }))
        
        // Clean up any dangling unverified factors first
        const { data: listData } = await supabase.auth.mfa.listFactors()
        if (listData?.totp) {
            const unverified = listData.totp.filter((f: any) => f.status === 'unverified')
            for (const f of unverified) {
                await supabase.auth.mfa.unenroll({ factorId: f.id })
            }
        }

        const { data, error } = await supabase.auth.mfa.enroll({ 
            factorType: 'totp',
            issuer: 'Dead Mans Switch',
            friendlyName: 'Device ' + new Date().getTime()
        })
        if (error) {
            alert(error.message)
            setMfaState(prev => ({ ...prev, loading: false }))
            return
        }
        setMfaState(prev => ({ 
            ...prev, 
            factorId: data.id, 
            qrCode: data.totp.qr_code, 
            loading: false 
        }))
    }

    const handleVerify2FA = async () => {
        setMfaState(prev => ({ ...prev, loading: true }))
        const challenge = await supabase.auth.mfa.challenge({ factorId: mfaState.factorId })
        if (challenge.error) {
            alert(challenge.error.message)
            setMfaState(prev => ({ ...prev, loading: false }))
            return
        }
        
        const { error } = await supabase.auth.mfa.verify({
            factorId: mfaState.factorId,
            challengeId: challenge.data.id,
            code: mfaState.verifyCode
        })

        if (error) {
            alert(error.message)
        } else {
            alert('2FA Enabled Successfully!')
            setMfaState(prev => ({ ...prev, isEnrolled: true, qrCode: '' }))
        }
        setMfaState(prev => ({ ...prev, loading: false }))
    }

    const handleDisable2FA = async () => {
        if (!confirm('Are you sure you want to disable 2FA?')) return
        setMfaState(prev => ({ ...prev, loading: true }))
        const { error } = await supabase.auth.mfa.unenroll({ factorId: mfaState.factorId })
        if (error) alert(error.message)
        else {
            alert('2FA Disabled')
            setMfaState(prev => ({ ...prev, isEnrolled: false, factorId: '', qrCode: '', verifyCode: '' }))
        }
        setMfaState(prev => ({ ...prev, loading: false }))
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
                        <User className="text-[#00ff41]" /> Operator Profile
                    </h1>
                    <p className="text-[10px] opacity-50 uppercase tracking-[0.3em]">Identification & Comm Links</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Full Name</label>
                                <input 
                                    type="text"
                                    value={profileData.full_name}
                                    onChange={e => setProfileData(p => ({...p, full_name: e.target.value}))}
                                    className="w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Email Registry</label>
                                <input 
                                    type="email"
                                    value={profileData.email}
                                    onChange={e => setProfileData(p => ({...p, email: e.target.value}))}
                                    className="w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Primary Phone</label>
                                <input 
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={e => setProfileData(p => ({...p, phone: e.target.value}))}
                                    className="w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Registry Date</label>
                                <div className="p-3 border border-[#00ff41]/20 bg-white/5 opacity-50">
                                    {mounted && profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '---'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={16} /> <span className="text-[10px] font-bold">SAVE PROFILE</span>
                        </button>
                    </div>
                </div>

                {/* Security Info */}
                <div className="border-b border-[#00ff41]/30 pb-8">
                    <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-4 mb-2">
                        <Shield className="text-[#00ff41]" /> Security Override
                    </h1>
                    <p className="text-[10px] opacity-50 uppercase tracking-[0.3em]">Passcodes & 2FA Tokens</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        {/* Password Change */}
                        <div className="border border-[#00ff41]/20 p-6 space-y-4">
                            <h3 className="flex items-center gap-2 font-bold text-lg mb-4"><Key size={18} /> Update Passcode</h3>
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">New Passcode</label>
                                <input 
                                    type="password"
                                    value={passwordData.new}
                                    onChange={e => setPasswordData(p => ({...p, new: e.target.value}))}
                                    className="w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Confirm Passcode</label>
                                <input 
                                    type="password"
                                    value={passwordData.confirm}
                                    onChange={e => setPasswordData(p => ({...p, confirm: e.target.value}))}
                                    className="w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none"
                                />
                            </div>
                            <button
                                onClick={handleSavePassword}
                                disabled={savingPassword || !passwordData.new}
                                className="w-full mt-4 p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all font-bold text-[10px]"
                            >
                                UPDATE PASSCODE
                            </button>
                        </div>

                        {/* 2FA Status */}
                        <div className="border border-[#00ff41]/20 p-6 space-y-4 flex flex-col justify-between">
                            <div>
                                <h3 className="flex items-center gap-2 font-bold text-lg mb-4"><Smartphone size={18} /> 2FA Configuration</h3>
                                <p className="text-xs opacity-70 mb-4">Multi-factor authentication adds an extra layer of security to your terminal access.</p>
                                
                                {mfaState.isEnrolled ? (
                                    <div className="p-4 border border-[#00ff41]/50 bg-[#00ff41]/10 text-[#00ff41] font-bold text-center">
                                        ✓ 2FA IS ACTIVE
                                    </div>
                                ) : (
                                    <div className="p-4 border border-red-900 bg-red-900/20 text-red-500 font-bold text-center">
                                        ⚠ 2FA IS DISABLED
                                    </div>
                                )}
                            </div>

                            {/* 2FA Actions */}
                            {!mfaState.isEnrolled && !mfaState.qrCode && (
                                <button
                                    onClick={handleEnable2FA}
                                    disabled={mfaState.loading}
                                    className="w-full p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all font-bold text-[10px]"
                                >
                                    ENROLL 2FA
                                </button>
                            )}

                            {!mfaState.isEnrolled && mfaState.qrCode && (
                                <div className="space-y-4 pt-4">
                                    <p className="text-[10px] text-center uppercase">Scan with Authenticator App</p>
                                    <div className="bg-white p-2 w-48 h-48 mx-auto flex items-center justify-center">
                                        <img 
                                            src={mfaState.qrCode} 
                                            alt="2FA QR Code" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] opacity-40 block uppercase mb-1">Verify 6-Digit Code</label>
                                        <input 
                                            type="text"
                                            value={mfaState.verifyCode}
                                            onChange={e => setMfaState(p => ({...p, verifyCode: e.target.value}))}
                                            className="w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none tracking-[0.5em] text-center"
                                            maxLength={6}
                                        />
                                    </div>
                                    <button
                                        onClick={handleVerify2FA}
                                        disabled={mfaState.loading || mfaState.verifyCode.length !== 6}
                                        className="w-full p-3 bg-[#00ff41] text-black font-bold text-[10px]"
                                    >
                                        VERIFY & ENABLE
                                    </button>
                                </div>
                            )}

                            {mfaState.isEnrolled && (
                                <button
                                    onClick={handleDisable2FA}
                                    disabled={mfaState.loading}
                                    className="w-full p-3 border border-red-900 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold text-[10px]"
                                >
                                    DISABLE 2FA
                                </button>
                            )}
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
                            <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Protocol ECHO Targets (Max 3)</p>
                        </div>
                        <button
                            onClick={handleAddTarget}
                            disabled={targets.length >= 3}
                            className={`text-[10px] border px-4 py-2 flex items-center gap-2 transition-colors ${targets.length >= 3 ? 'border-[#00ff41]/20 text-[#00ff41]/20 cursor-not-allowed' : 'border-[#00ff41] hover:bg-[#00ff41]/10'}`}
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
                                            <label className="text-[8px] opacity-40 uppercase">Connection Type</label>
                                            <select
                                                value={target.type || 'whatsapp'}
                                                onChange={(e) => handleUpdateTarget(target.id, 'type', e.target.value)}
                                                className="w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="whatsapp">WhatsApp</option>
                                                <option value="email">Email</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] opacity-40 uppercase">Destination</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={target.destination_value || ''}
                                                    onChange={(e) => handleUpdateTarget(target.id, 'destination_value', e.target.value)}
                                                    className="w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none font-mono"
                                                />
                                                {target.type === 'email' && (
                                                    <button 
                                                        onClick={() => handleTestEmail(target.destination_value, target.id)}
                                                        disabled={testLoading[target.id]}
                                                        className="px-3 border border-[#00ff41] text-[10px] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors whitespace-nowrap"
                                                    >
                                                        {testLoading[target.id] ? 'SENDING...' : 'VALIDATE'}
                                                    </button>
                                                )}
                                            </div>
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
                                            className="w-full h-32 bg-black/50 border border-[#00ff41]/20 p-3 text-xs font-mono resize-none focus:border-[#00ff41]/50 focus:outline-none"
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
        </main>
    )
}
