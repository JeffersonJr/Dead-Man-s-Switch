'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { RefreshCw, AlertTriangle } from 'lucide-react'
import { playSound } from '@/lib/sounds'
import { SystemModal } from '@/components/SystemModal'

interface ResetButtonProps {
    onReset: () => void
    isCritical?: boolean
}

export default function ResetButton({ onReset, isCritical }: ResetButtonProps) {
    const [loading, setLoading] = useState(false)
    const [sequence, setSequence] = useState('')
    const [modal, setModal] = useState<{open:boolean,title:string,message:string,type:'error'|'warning'|'success'|'info'}>({open:false,title:'',message:'',type:'error'})
    const closeModal = () => setModal(m => ({...m, open:false}))
    const handleReset = async () => {
        const supabase = createClient()
        if (sequence.trim() !== '4 8 15 16 23 42') {
            setModal({open:true, title:'ACESSO NEGADO', message:'SEQUÊNCIA INVÁLIDA. Tente novamente.', type:'error'})
            return
        }

        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Update counter_status (only updating last_reset_at because deadline_at and email_enviado don't exist in the current schema)
            const { error: counterError } = await supabase
                .from('counter_status')
                .update({ 
                    last_reset_at: new Date().toISOString()
                })
                .eq('user_id', user.id)

            if (counterError) {
                console.error('Supabase update error:', counterError)
                throw new Error(counterError.message || 'Failed to update counter_status')
            }

            // Log the reset
            await supabase.from('logs').insert({
                user_id: user.id,
                user_agent: navigator.userAgent,
            })

            setSequence('')
            playSound('reset')
            onReset()
        } catch (error: any) {
            console.error('Reset failed:', error)
            setModal({open:true, title:'SYSTEM ERROR', message:`RESET FAILED: ${error?.message || JSON.stringify(error)}`, type:'error'})
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault()
                handleReset()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [sequence, onReset])

    return (
        <div className="flex flex-col items-center gap-8">
            <SystemModal open={modal.open} title={modal.title} message={modal.message} type={modal.type} variant="alert" onConfirm={closeModal} />
            <div className="w-full max-w-xs">
                <label className={`block text-[10px] uppercase tracking-[0.3em] mb-2 opacity-70 text-center ${isCritical ? 'text-red-700' : ''}`}>Enter Execute Sequence</label>
                <input
                    type="text"
                    value={sequence}
                    onChange={(e) => {
                        setSequence(e.target.value)
                        playSound('beep')
                    }}
                    placeholder="X X X X X X"
                    className={`w-full bg-black border-b-2 ${isCritical ? 'border-red-600 text-red-600' : 'border-[#00ff41] text-[#00ff41]'} p-2 text-center text-2xl font-black tracking-widest focus:outline-none focus:border-opacity-100 border-opacity-30 uppercase placeholder:opacity-20 transition-colors duration-500`}
                />
            </div>

            <button
                onClick={handleReset}
                disabled={loading}
                className={`
          relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-8 ${isCritical ? 'border-red-600 shadow-[0_0_30px_rgba(255,0,0,0.5)]' : 'border-[#00ff41]'} 
          flex flex-col items-center justify-center gap-2
          transition-all duration-300 active:scale-95
          ${loading ? 'animate-pulse opacity-50' : isCritical ? 'hover:bg-red-950/40' : 'hover:bg-[rgba(0,255,65,0.1)] hover:shadow-[0_0_50px_rgba(0,255,65,0.4)]'}
        `}
            >
                <div className={`absolute inset-0 bg-transparent border-2 ${isCritical ? 'border-red-600' : 'border-[#00ff41]'} rounded-full scale-110 opacity-20`}></div>
                <span className={`text-lg sm:text-xl font-black tracking-[0.2em] ${isCritical ? 'text-red-600' : ''}`}>EXECUTE</span>
                <span className="text-[8px] opacity-40 absolute bottom-8 uppercase tracking-widest font-bold">⌘ + Enter</span>
            </button>

            <div className="flex items-center gap-2 text-[#00ff41] animate-pulse">
                <AlertTriangle size={20} />
                <span className="text-xs uppercase tracking-widest">Execute reset sequence before terminal time</span>
            </div>
        </div>
    )
}
