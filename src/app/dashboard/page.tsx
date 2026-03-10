'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ResetButton from '@/components/ResetButton'
import { LogOut, Activity, Clock, Terminal, Settings } from 'lucide-react'
import { formatDistanceToNow, addHours } from 'date-fns'
import { playSound } from '@/lib/sounds'

export default function DashboardPage() {
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [timeLeft, setTimeLeft] = useState<string>('')
    const [mounted, setMounted] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const fetchStatus = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/login')
            return
        }

        const { data, error } = await supabase
            .from('counter_status')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (error) console.error(error)
        else {
            setStatus(data)
            // Redirect to onboarding if not completed
            const { data: profile } = await supabase
                .from('profiles')
                .select('onboarding_completed')
                .eq('user_id', user.id)
                .single()

            if (profile && !profile.onboarding_completed) {
                router.push('/onboarding')
            }
        }
        setLoading(false)
    }, [supabase, router])

    useEffect(() => {
        setMounted(true)
        fetchStatus()
    }, [fetchStatus])

    const warnTriggered = useState(false)

    const [alarmAudio, setAlarmAudio] = useState<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (!status?.last_reset_at) return

        const timer = setInterval(() => {
            const lastReset = new Date(status.last_reset_at)
            const nextReset = addHours(lastReset, 24)
            const now = new Date()

            const diff = nextReset.getTime() - now.getTime()
            const secondsLeft = Math.floor(diff / 1000)

            // Hieroglyphs mode (under 1 minute)
            const isHieroglyphs = secondsLeft <= 60 && secondsLeft > 0

            // Alarm 1 minute (60 seconds)
            if (isHieroglyphs && !alarmAudio) {
                const audio = playSound('alarm')
                if (audio) setAlarmAudio(audio)
            } else if ((secondsLeft > 60 || secondsLeft <= 0) && alarmAudio) {
                alarmAudio.pause()
                setAlarmAudio(null)
            }

            // 10-minute warning (600 seconds)
            if (secondsLeft === 600 && !warnTriggered[0]) {
                warnTriggered[1](true)
                supabase.functions.invoke('warn-user', {
                    body: { userId: status.user_id, minutesLeft: 10 }
                })
            }

            if (diff <= 0) {
                setTimeLeft('SYSTEM OVERRIDE REQUIRED')
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)
                setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [status])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-[#00ff41] font-mono crt">
            <span className="animate-pulse tracking-[0.5em] text-2xl uppercase">SYSTEM INITIALIZING...</span>
        </div>
    )

    const secondsLeft = status?.last_reset_at
        ? Math.floor((addHours(new Date(status.last_reset_at), 24).getTime() - new Date().getTime()) / 1000)
        : 100000

    const isCritical = secondsLeft <= 60 && secondsLeft > 0

    return (
        <main className={`min-h-screen bg-black ${isCritical ? 'text-red-600' : 'text-[#00ff41]'} font-mono p-4 md:p-8 relative crt`}>
            {/* Station Logo Watermark */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]">
                <img src="/logo.png" alt="Dharma" className={`w-full h-full grayscale ${isCritical ? 'sepia invert' : 'invert'}`} />
            </div>

            {/* Header */}
            <div className={`flex flex-col sm:flex-row justify-between items-center mb-12 border-b ${isCritical ? 'border-red-600' : 'border-[#00ff41]'} pb-4 gap-4 relative z-10`}>
                <div className="flex items-center gap-3 sm:gap-4">
                    <img src="/logo.png" alt="Swan" className={`w-10 h-10 sm:w-12 sm:h-12 grayscale ${isCritical ? 'sepia invert' : 'invert'}`} />
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold tracking-tighter uppercase">Dharma Initiative</h1>
                        <p className="text-[8px] sm:text-[10px] opacity-70 uppercase tracking-widest leading-none">The Swan Station / Operator Console</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/settings')}
                        className={`flex items-center gap-2 hover:bg-[#00ff41] hover:text-black px-4 py-2 border transition-colors text-[10px] sm:text-xs w-full sm:w-auto justify-center ${isCritical ? 'border-red-600 hover:bg-red-600' : 'border-[#00ff41]'}`}
                    >
                        <Settings size={16} /> CONFIG
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 hover:bg-[#00ff41] hover:text-black px-4 py-2 border transition-colors text-[10px] sm:text-xs w-full sm:w-auto justify-center ${isCritical ? 'border-red-600 hover:bg-red-600' : 'border-[#00ff41]'}`}
                    >
                        <LogOut size={16} /> TERMINATE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 pb-12">
                {/* Main Control */}
                <div className={`lg:col-span-2 ${isCritical ? 'border-red-600 border-4 bg-red-950/20 shadow-[0_0_50px_rgba(255,0,0,0.3)]' : 'border-[#00ff41]'} border p-4 sm:p-8 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] shadow-[inset_0_0_20px_rgba(0,255,65,0.1)] transition-colors duration-500`}>
                    <div className="mb-12 text-center w-full px-2">
                        <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-6 opacity-70">
                            {isCritical ? 'CRITICAL SYSTEM FAILURE IMMINENT' : 'Countdown to Failure'}
                        </h2>
                        <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black ${isCritical ? 'error-glow-text font-serif italic' : 'glow-text'} tabular-nums break-all`}>
                            {isCritical ? '𓀐𓀑𓀒𓀓𓀔' : (timeLeft || '00:00:00')}
                        </div>
                        {isCritical && (
                            <div className="mt-6 animate-bounce text-lg sm:text-2xl font-black">SYSTEM OVERRIDE REQUIRED</div>
                        )}
                    </div>

                    <ResetButton onReset={fetchStatus} isCritical={isCritical} />
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className={`${isCritical ? 'border-red-600' : 'border-[#00ff41]'} border p-6 space-y-4`}>
                        <h3 className={`flex items-center gap-2 text-sm font-bold border-b ${isCritical ? 'border-red-600' : 'border-[#00ff41]'} pb-2`}>
                            <Activity size={18} /> SYSTEM STATUS
                        </h3>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="opacity-70 uppercase text-[10px]">Registry:</span>
                                <span className="font-bold">ACTIVE</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70 uppercase text-[10px]">Service:</span>
                                <span className="font-bold">MONITORING</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-70 uppercase text-[10px]">Interval:</span>
                                <span className="font-bold uppercase">24 HOURS</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-[#00ff41] p-6 space-y-4">
                        <h3 className="flex items-center gap-2 text-sm font-bold border-b border-[#00ff41] pb-2">
                            <Clock size={18} /> LAST VERIFICATION
                        </h3>
                        <p className="text-xl font-bold">
                            {mounted && status?.last_reset_at
                                ? formatDistanceToNow(new Date(status.last_reset_at), { addSuffix: true }).toUpperCase()
                                : '---'}
                        </p>
                    </div>

                    <div className="border border-[#00ff41] p-6">
                        <p className="text-[10px] leading-relaxed opacity-60">
                            WARNING: SYSTEM FAILURE TO RECEIVE RESET SEQUENCE WITHIN ASSIGNED PARAMETERS WILL RESULT IN IMMEDIATE ACTIVATION OF PROTOCOL ECHO.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
