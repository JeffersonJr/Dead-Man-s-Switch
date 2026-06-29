'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Users, Save, Trash2, Plus, ArrowLeft, Shield, Key, Smartphone, User } from 'lucide-react'
import { SystemModal, SystemToast } from '@/components/SystemModal'

interface Contact {
    id: string;
    name: string;
    message: string;
    enabled: boolean;
    email: string;
    telegram: string;
    emailId: string | null;
    telegramId: string | null;
}

export default function SettingsPage() {
    // Basic states
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Data states
    const [contacts, setContacts] = useState<Contact[]>([])
    const [profile, setProfile] = useState<any>(null)
    const [profileData, setProfileData] = useState({ full_name: '', email: '', phone: '', realtime_location_link: '' })
    const [testLoading, setTestLoading] = useState<{[key: string]: boolean}>({})
    const [toastMessage, setToastMessage] = useState<{title: string, desc: string, type: 'error'|'success'} | null>(null)
    const [telegramTestLoading, setTelegramTestLoading] = useState(false)
    
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

    // Panic Modal
    const [panicModalOpen, setPanicModalOpen] = useState(false)
    const [panicLoading, setPanicLoading] = useState(false)

    // System Modal (replaces all alert/confirm)
    type SysModalState = {
        open: boolean
        title: string
        message: string
        variant: 'alert' | 'confirm'
        type: 'error' | 'success' | 'warning' | 'info'
        confirmLabel?: string
        cancelLabel?: string
        loading?: boolean
        onConfirm: () => void
        onCancel?: () => void
    }
    const [sysModal, setSysModal] = useState<SysModalState>({
        open: false, title: '', message: '', variant: 'alert', type: 'info',
        onConfirm: () => setSysModal(s => ({ ...s, open: false }))
    })
    const showAlert = (title: string, message: string, type: SysModalState['type'] = 'info') =>
        setSysModal({ open: true, title, message, variant: 'alert', type, onConfirm: () => setSysModal(s => ({ ...s, open: false })) })
    const showConfirm = (title: string, message: string, onConfirm: () => void, type: SysModalState['type'] = 'warning') =>
        setSysModal({ open: true, title, message, variant: 'confirm', type, confirmLabel: 'SIM', cancelLabel: 'NÃO', onConfirm, onCancel: () => setSysModal(s => ({ ...s, open: false })) })

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
                phone: profileObj?.phone || '',
                realtime_location_link: profileObj?.realtime_location_link || ''
            })

            // Targets -> Contacts
            const { data: targetsData } = await supabase
                .from('notification_targets')
                .select('*')
                .eq('user_id', user.id)
            
            const contactsMap = new Map<string, Contact>()
            if (targetsData) {
                targetsData.forEach((t: any) => {
                    const key = t.target_name || 'UNKNOWN'
                    if (!contactsMap.has(key)) {
                        contactsMap.set(key, {
                            id: Math.random().toString(36).substring(7),
                            name: key,
                            message: t.message || '',
                            enabled: t.enabled !== false,
                            email: t.type === 'email' ? t.destination_value : '',
                            telegram: t.type === 'telegram' ? t.destination_value : '',
                            emailId: t.type === 'email' ? t.id : null,
                            telegramId: t.type === 'telegram' ? t.id : null
                        })
                    } else {
                        const c = contactsMap.get(key)!
                        if (t.type === 'email') {
                            c.email = t.destination_value
                            c.emailId = t.id
                        } else if (t.type === 'telegram') {
                            c.telegram = t.destination_value
                            c.telegramId = t.id
                        }
                    }
                })
            }
            setContacts(Array.from(contactsMap.values()))

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

    // Easter egg
    useEffect(() => {
        let keys: string[] = []
        const konami = ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown']

        const handleKeyDown = (e: KeyboardEvent) => {
            keys.push(e.key)
            if (keys.length > 4) keys.shift()
            
            if (keys.join(',') === konami.join(',')) {
                setPanicModalOpen(true)
                keys = []
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleTriggerPanic = async () => {
        setPanicLoading(true)
        setSysModal(s => ({ ...s, loading: true }))
        try {
            const { data: { user } } = await supabase.auth.getUser()
            const res = await fetch('/api/trigger-panic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user?.id })
            })
            if (!res.ok) throw new Error(await res.text())
            setPanicModalOpen(false)
            setSysModal(s => ({ ...s, open: false, loading: false }))
            showAlert('⚠ PÂNICO DISPARADO', 'Alertas enviados a todos os contatos configurados.', 'success')
        } catch (err: any) {
            setSysModal(s => ({ ...s, loading: false }))
            showAlert('ERRO AO DISPARAR', err.message, 'error')
        } finally {
            setPanicLoading(false)
        }
    }

    // --- Profile Handlers ---
    const handleSaveProfile = async () => {
        setSaving(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        let emailChanged = false;
        if (profileData.email !== user.email) {
            const { error: emailError } = await supabase.auth.updateUser({ email: profileData.email })
            if (emailError) {
                showAlert('ERRO AO ATUALIZAR EMAIL', emailError.message, 'error')
            } else {
                emailChanged = true;
            }
        }

        const { error: profileError } = await supabase
            .from('profiles')
            .update({ full_name: profileData.full_name, phone: profileData.phone, realtime_location_link: profileData.realtime_location_link })
            .eq('user_id', user.id)

        if (profileError) showAlert('ERRO AO SALVAR PERFIL', profileError.message, 'error')
        else showAlert('PERFIL ATUALIZADO', emailChanged ? 'Verifique seu email para confirmar a alteração de endereço.' : 'Dados salvos com sucesso.', 'success')
        setSaving(false)
    }

    // --- Contacts Handlers ---
    const handleUpdateContact = (id: string, field: string, value: any) => {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
    }

    const handleSaveContact = async (contact: Contact) => {
        if (!contact.name) {
            showAlert('CAMPO OBRIGATÓRIO', 'Por favor informe um nome para o contato.', 'warning')
            return
        }

        setSaving(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        try {
            // Save email
            if (contact.email) {
                if (contact.emailId) {
                    const { error } = await supabase.from('notification_targets').update({
                        target_name: contact.name, destination_value: contact.email, message: contact.message, enabled: contact.enabled
                    }).eq('id', contact.emailId)
                    if (error) throw new Error(`Email update failed: ${error.message}`)
                } else {
                    const { data, error } = await supabase.from('notification_targets').insert({
                        user_id: user.id, type: 'email', target_name: contact.name, destination_value: contact.email, message: contact.message, enabled: contact.enabled
                    }).select().single()
                    if (error) throw new Error(`Email insert failed: ${error.message}`)
                    if (data) contact.emailId = data.id
                }
            } else if (contact.emailId) {
                const { error } = await supabase.from('notification_targets').delete().eq('id', contact.emailId)
                if (error) throw new Error(`Email delete failed: ${error.message}`)
                contact.emailId = null
            }

            // Save telegram
            if (contact.telegram) {
                if (contact.telegramId) {
                    const { error } = await supabase.from('notification_targets').update({
                        target_name: contact.name, destination_value: contact.telegram, message: contact.message, enabled: contact.enabled
                    }).eq('id', contact.telegramId)
                    if (error) throw new Error(`Telegram update failed: ${error.message}`)
                } else {
                    const { data, error } = await supabase.from('notification_targets').insert({
                        user_id: user.id, type: 'telegram', target_name: contact.name, destination_value: contact.telegram, message: contact.message, enabled: contact.enabled
                    }).select().single()
                    if (error) throw new Error(`Telegram insert failed: ${error.message}`)
                    if (data) contact.telegramId = data.id
                }
            } else if (contact.telegramId) {
                const { error } = await supabase.from('notification_targets').delete().eq('id', contact.telegramId)
                if (error) throw new Error(`Telegram delete failed: ${error.message}`)
                contact.telegramId = null
            }
            
            // Sync state ID
            setContacts(prev => prev.map(c => c.id === contact.id ? {...contact} : c))
            showAlert('CONTATO SALVO', 'Os dados foram gravados com sucesso.', 'success')
        } catch (err: any) {
            showAlert('ERRO AO SALVAR CONTATO', err.message, 'error')
        }
        setSaving(false)
    }


    const handleDeleteContact = async (contact: Contact) => {
        showConfirm(
            'PROTOCOL ECHO',
            'Excluir permanentemente os dados deste contato?',
            async () => {
                setSysModal(s => ({ ...s, open: false }))
                setSaving(true)
                try {
                    if (contact.emailId) await supabase.from('notification_targets').delete().eq('id', contact.emailId)
                    if (contact.telegramId) await supabase.from('notification_targets').delete().eq('id', contact.telegramId)
                    setContacts(prev => prev.filter(c => c.id !== contact.id))
                } catch (err: any) {
                    showAlert('ERRO AO EXCLUIR', err.message, 'error')
                }
                setSaving(false)
            },
            'error'
        )
    }

    const handleAddContact = () => {
        if (contacts.length >= 3) {
            showAlert('LIMITE ATINGIDO', 'Máximo de 3 contatos permitido.', 'warning')
            return
        }

        setContacts([...contacts, {
            id: Math.random().toString(36).substring(7),
            name: 'NEW CONTACT',
            message: 'SYSTEM WARNING: Only 10 minutes remaining. Reset requested immediately.',
            enabled: true,
            email: '',
            telegram: '',
            emailId: null,
            telegramId: null
        }])
    }

    const handleTestEmail = async (email: string, id: string) => {
        if (!email || !email.includes('@')) {
            showAlert('EMAIL INVÁLIDO', 'Por favor insira um endereço de email válido antes de testar.', 'warning')
            return
        }
        setTestLoading(prev => ({ ...prev, [id]: true }))
        try {
            const res = await fetch('/api/test-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            if (!res.ok) {
                const text = await res.text()
                let errorMsg = text
                try { const parsed = JSON.parse(text); errorMsg = parsed.error || text } catch (e) {}
                throw new Error(errorMsg)
            }
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            showAlert('EMAIL DE TESTE ENVIADO', 'Verifique sua caixa de entrada.', 'success')
        } catch (err: any) {
            showAlert('FALHA NO ENVIO', err.message, 'error')
        } finally {
            setTestLoading(prev => ({ ...prev, [id]: false }))
        }
    }

    // --- Security Handlers ---
    const handleSavePassword = async () => {
        if (passwordData.new !== passwordData.confirm) {
            showAlert('SENHAS NÃO CONFEREM', 'As senhas digitadas são diferentes.', 'warning')
            return
        }
        if (passwordData.new.length < 6) {
            showAlert('SENHA MUITO CURTA', 'A senha deve ter pelo menos 6 caracteres.', 'warning')
            return
        }
        setSavingPassword(true)
        const { error } = await supabase.auth.updateUser({ password: passwordData.new })
        if (error) showAlert('ERRO AO ATUALIZAR SENHA', error.message, 'error')
        else {
            showAlert('SENHA ATUALIZADA', 'Sua senha foi alterada com sucesso.', 'success')
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
            showAlert('ERRO AO ATIVAR 2FA', error.message, 'error')
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
            showAlert('ERRO NA VERIFICAÇÃO', error.message, 'error')
        } else {
            showAlert('2FA ATIVADO', 'Autenticação de dois fatores habilitada com sucesso.', 'success')
            setMfaState(prev => ({ ...prev, isEnrolled: true, qrCode: '' }))
        }
        setMfaState(prev => ({ ...prev, loading: false }))
    }

    const handleDisable2FA = async () => {
        showConfirm(
            'DESATIVAR 2FA',
            'Tem certeza que deseja desativar a autenticação de dois fatores?',
            async () => {
                setSysModal(s => ({ ...s, open: false }))
                setMfaState(prev => ({ ...prev, loading: true }))
                const { error } = await supabase.auth.mfa.unenroll({ factorId: mfaState.factorId })
                if (error) showAlert('ERRO', error.message, 'error')
                else {
                    showAlert('2FA DESATIVADO', 'Autenticação de dois fatores removida.', 'info')
                    setMfaState(prev => ({ ...prev, isEnrolled: false, factorId: '', qrCode: '', verifyCode: '' }))
                }
                setMfaState(prev => ({ ...prev, loading: false }))
            },
            'warning'
        )
    }

    const handleTestTelegram = async () => {
        setTelegramTestLoading(true)
        try {
            const res = await fetch('/api/test-telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            
            if (!res.ok) {
                const text = await res.text()
                let errorMsg = text
                try {
                    const parsed = JSON.parse(text)
                    errorMsg = parsed.error || text
                } catch (e) {}
                throw new Error(errorMsg)
            }
            
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setToastMessage({ title: 'Telegram Validado', desc: data.message || 'Integração OK!', type: 'success' })
            setTimeout(() => setToastMessage(null), 5000)
        } catch (err: any) {
            setToastMessage({ title: 'Erro de Validação (Telegram)', desc: err.message, type: 'error' })
            setTimeout(() => setToastMessage(null), 10000)
        } finally {
            setTelegramTestLoading(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-[#00ff41] font-mono crt">
            <span className="animate-pulse tracking-[0.5em] text-2xl uppercase">SYNCING TERMINAL...</span>
        </div>
    )

    return (
        <main className="min-h-screen bg-black text-[#00ff41] font-mono p-4 md:p-8 crt">
            {/* System Modal — replaces all alert/confirm */}
            <SystemModal
                open={sysModal.open}
                title={sysModal.title}
                message={sysModal.message}
                variant={sysModal.variant}
                type={sysModal.type}
                confirmLabel={sysModal.confirmLabel}
                cancelLabel={sysModal.cancelLabel}
                loading={sysModal.loading}
                onConfirm={sysModal.onConfirm}
                onCancel={sysModal.onCancel}
            />

            {/* System Toast */}
            <SystemToast
                open={!!toastMessage}
                title={toastMessage?.title || ''}
                desc={toastMessage?.desc}
                type={toastMessage?.type || 'info'}
                onClose={() => setToastMessage(null)}
            />

            {/* Panic Modal */}
            <SystemModal
                open={panicModalOpen}
                title="⚠ AVISO DE PERIGO ⚠"
                message={`Ao disparar essa mensagem, o sistema enviará um alerta a TODOS os contatos configurados imediatamente (simulando a falha do timer e o Protocolo ECHO chegando a zero).\n\nDeseja prosseguir?`}
                variant="confirm"
                type="error"
                confirmLabel={panicLoading ? 'DISPARANDO...' : 'SIM, DISPARAR'}
                cancelLabel="NÃO"
                loading={panicLoading}
                onConfirm={handleTriggerPanic}
                onCancel={() => setPanicModalOpen(false)}
            />

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
                                <label className="text-[10px] opacity-40 block uppercase mb-1">Link de Rastreamento (Google Maps)</label>
                                <input 
                                    type="text"
                                    value={profileData.realtime_location_link}
                                    onChange={e => setProfileData(p => ({...p, realtime_location_link: e.target.value}))}
                                    placeholder="Cole aqui o link de compartilhamento contínuo"
                                    className="w-full p-3 border border-[#00ff41]/20 bg-black text-[#00ff41] focus:border-[#00ff41] focus:outline-none transition-colors"
                                />
                                <p className="text-[8px] opacity-50 mt-1">Cole aqui o link de compartilhamento contínuo gerado no seu celular</p>
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
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleTestTelegram}
                                disabled={telegramTestLoading}
                                className="text-[10px] border border-[#00ff41] text-[#00ff41] px-4 py-2 hover:bg-[#00ff41] hover:text-black transition-colors flex items-center justify-center gap-2 font-bold whitespace-nowrap"
                            >
                                {telegramTestLoading ? 'TESTANDO...' : 'VALIDAR TELEGRAM'}
                            </button>
                            <button
                                onClick={handleAddContact}
                                disabled={contacts.length >= 3}
                                className={`text-[10px] border px-4 py-2 flex items-center justify-center gap-2 transition-colors ${contacts.length >= 3 ? 'border-[#00ff41]/20 text-[#00ff41]/20 cursor-not-allowed' : 'border-[#00ff41] hover:bg-[#00ff41]/10'}`}
                            >
                                <Plus size={14} /> NEW ENTRY
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {contacts.map(contact => (
                            <div key={contact.id} className="border border-[#00ff41]/30 p-6 bg-black/40 hover:border-[#00ff41]/60 transition-colors">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    <div className="lg:col-span-4 space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[8px] opacity-40 uppercase">Target Name</label>
                                            <input
                                                type="text"
                                                value={contact.name}
                                                onChange={(e) => handleUpdateContact(contact.id, 'name', e.target.value)}
                                                className="w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none"
                                            />
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <label className="text-[8px] opacity-40 uppercase">Telegram Chat ID</label>
                                            <input
                                                type="text"
                                                value={contact.telegram}
                                                onChange={(e) => handleUpdateContact(contact.id, 'telegram', e.target.value)}
                                                className="w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none font-mono"
                                                placeholder="e.g. 12345678"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[8px] opacity-40 uppercase">Email Address</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="email"
                                                    value={contact.email}
                                                    onChange={(e) => handleUpdateContact(contact.id, 'email', e.target.value)}
                                                    className="w-full bg-black border-b border-[#00ff41]/30 p-2 text-sm focus:border-[#00ff41] focus:outline-none font-mono"
                                                    placeholder="e.g. alert@example.com"
                                                />
                                                <button 
                                                    onClick={() => handleTestEmail(contact.email, contact.id)}
                                                    disabled={testLoading[contact.id] || !contact.email}
                                                    className="px-3 border border-[#00ff41] text-[10px] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors whitespace-nowrap disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#00ff41]"
                                                >
                                                    {testLoading[contact.id] ? '...' : 'TEST'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={contact.enabled}
                                                    onChange={(e) => handleUpdateContact(contact.id, 'enabled', e.target.checked)}
                                                    className="hidden"
                                                />
                                                <div className={`w-4 h-4 border ${contact.enabled ? 'bg-[#00ff41] border-[#00ff41]' : 'border-[#00ff41]/30'} flex items-center justify-center`}>
                                                    {contact.enabled && <div className="w-2 h-2 bg-black" />}
                                                </div>
                                                <span className="text-[10px] uppercase opacity-70 group-hover:opacity-100">Active</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-6 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[8px] opacity-40 uppercase">Custom Message <span className="opacity-60">(HTML aceito)</span></label>
                                        </div>

                                        {/* Tag chips */}
                                        <div className="flex flex-wrap gap-2 pb-1">
                                            {[
                                                { tag: '{{nome}}',  desc: 'Nome do contato' },
                                                { tag: '{{data}}',  desc: 'Data atual' },
                                                { tag: '{{hora}}',  desc: 'Hora atual' },
                                            ].map(({ tag, desc }) => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    title={desc}
                                                    onClick={() => {
                                                        const ta = document.getElementById(`msg-${contact.id}`) as HTMLTextAreaElement | null
                                                        if (!ta) return
                                                        const start = ta.selectionStart
                                                        const end   = ta.selectionEnd
                                                        const val   = contact.message
                                                        const next  = val.slice(0, start) + tag + val.slice(end)
                                                        handleUpdateContact(contact.id, 'message', next)
                                                        requestAnimationFrame(() => {
                                                            ta.focus()
                                                            ta.setSelectionRange(start + tag.length, start + tag.length)
                                                        })
                                                    }}
                                                    className="px-2 py-0.5 text-[9px] font-mono border border-[#00ff41]/40 text-[#00ff41]/70 hover:border-[#00ff41] hover:text-[#00ff41] hover:bg-[#00ff41]/10 transition-all tracking-wide"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                            <span className="text-[8px] opacity-30 self-center ml-1">↑ clique para inserir na posição do cursor</span>
                                        </div>

                                        <textarea
                                            id={`msg-${contact.id}`}
                                            value={contact.message}
                                            onChange={(e) => handleUpdateContact(contact.id, 'message', e.target.value)}
                                            className="w-full h-36 bg-black/50 border border-[#00ff41]/20 p-3 text-xs font-mono resize-y focus:border-[#00ff41]/50 focus:outline-none leading-relaxed"
                                            placeholder={'Olá {{nome}},\n\nSua mensagem aqui...\n\nVocê também pode usar <b>HTML</b>.'}
                                            spellCheck={false}
                                        />

                                        {/* Live HTML preview */}
                                        {contact.message && (
                                            <details className="group">
                                                <summary className="text-[8px] opacity-40 uppercase cursor-pointer hover:opacity-70 transition-opacity select-none">
                                                    {'▶ Preview (com {{nome}} = "'}{contact.name || 'Contato'}{'\")'}
                                                </summary>
                                                <div
                                                    className="mt-2 p-3 border border-[#00ff41]/10 bg-black/30 text-xs leading-relaxed prose-invert max-h-32 overflow-y-auto"
                                                    dangerouslySetInnerHTML={{
                                                        __html: contact.message
                                                            .replace(/\{\{nome\}\}/g, `<strong>${contact.name || 'Contato'}</strong>`)
                                                            .replace(/\{\{data\}\}/g, new Date().toLocaleDateString('pt-BR'))
                                                            .replace(/\{\{hora\}\}/g, new Date().toLocaleTimeString('pt-BR'))
                                                    }}
                                                />
                                            </details>
                                        )}
                                    </div>

                                    <div className="lg:col-span-2 flex lg:flex-col justify-end lg:justify-center gap-4">
                                        <button
                                            onClick={() => handleSaveContact(contact)}
                                            disabled={saving}
                                            className="p-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all flex items-center justify-center gap-2 lg:w-full disabled:opacity-50"
                                        >
                                            <Save size={16} /> <span className="text-[10px] font-bold">SAVE</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteContact(contact)}
                                            disabled={saving}
                                            className="p-3 border border-red-900 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 lg:w-full disabled:opacity-50"
                                        >
                                            <Trash2 size={16} /> <span className="text-[10px] font-bold">DROP</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {contacts.length === 0 && (
                            <div className="text-center py-12 border border-dashed border-[#00ff41]/20 opacity-30">
                                NO EMERGENCY CONTACTS REGISTERED
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {toastMessage && (
                <div className={`fixed bottom-4 right-4 max-w-sm p-4 border ${toastMessage.type === 'error' ? 'bg-red-950/90 border-red-500 text-red-500' : 'bg-black/90 border-[#00ff41] text-[#00ff41]'} shadow-[0_0_15px_rgba(0,0,0,0.5)] z-50`}>
                    <h4 className="font-bold mb-1 text-sm uppercase">{toastMessage.title}</h4>
                    <p className="text-xs opacity-90 font-mono break-words">{toastMessage.desc}</p>
                    <button onClick={() => setToastMessage(null)} className="absolute top-2 right-2 opacity-50 hover:opacity-100">✕</button>
                </div>
            )}
        </main>
    )
}
