'use client'

import { useEffect, useRef } from 'react'

// ────────────────────────────────────────────────────────────
// SystemModal — confirmação/alerta com a UI do sistema
// ────────────────────────────────────────────────────────────
interface SystemModalProps {
    open: boolean
    title: string
    message: string
    /** 'alert' = só botão OK | 'confirm' = Sim + Não */
    variant?: 'alert' | 'confirm'
    /** tipo visual */
    type?: 'error' | 'success' | 'warning' | 'info'
    confirmLabel?: string
    cancelLabel?: string
    loading?: boolean
    onConfirm: () => void
    onCancel?: () => void
}

export function SystemModal({
    open,
    title,
    message,
    variant = 'alert',
    type = 'info',
    confirmLabel = 'OK',
    cancelLabel = 'CANCELAR',
    loading = false,
    onConfirm,
    onCancel,
}: SystemModalProps) {
    const confirmRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (open) confirmRef.current?.focus()
    }, [open])

    // fecha com Escape
    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCancel?.()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, onCancel])

    if (!open) return null

    const colors = {
        error:   { border: 'border-red-500',     text: 'text-red-400',     bg: 'bg-red-950/90',   glow: 'shadow-[0_0_50px_rgba(255,0,0,0.4)]' },
        success: { border: 'border-[#00ff41]',   text: 'text-[#00ff41]',   bg: 'bg-black/95',     glow: 'shadow-[0_0_40px_rgba(0,255,65,0.3)]' },
        warning: { border: 'border-yellow-400',  text: 'text-yellow-400',  bg: 'bg-black/95',     glow: 'shadow-[0_0_40px_rgba(255,200,0,0.3)]' },
        info:    { border: 'border-[#00ff41]',   text: 'text-[#00ff41]',   bg: 'bg-black/95',     glow: 'shadow-[0_0_30px_rgba(0,255,65,0.2)]' },
    }
    const c = colors[type]

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onCancel?.() }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="sys-modal-title"
                className={`
                    relative bg-black border-2 ${c.border} ${c.glow}
                    w-full max-w-md font-mono
                    animate-[fadeInScale_120ms_ease-out]
                `}
            >
                {/* Header */}
                <div className={`px-6 py-4 border-b ${c.border} flex items-center gap-3`}>
                    <span className={`text-xs uppercase tracking-[0.4em] opacity-50`}>SYSTEM ALERT</span>
                    <span className="ml-auto text-[10px] opacity-30 tabular-nums">{new Date().toLocaleTimeString('pt-BR')}</span>
                </div>

                {/* Body */}
                <div className="px-6 py-8 space-y-4">
                    <h2
                        id="sys-modal-title"
                        className={`text-xl font-black uppercase tracking-widest ${c.text} ${type === 'warning' || type === 'error' ? 'animate-pulse' : ''}`}
                    >
                        {title}
                    </h2>
                    <p className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap">{message}</p>
                </div>

                {/* Footer */}
                <div className={`px-6 py-4 border-t ${c.border} flex gap-3 justify-end`}>
                    {variant === 'confirm' && onCancel && (
                        <button
                            onClick={onCancel}
                            disabled={loading}
                            className={`px-6 py-2 border ${c.border} ${c.text} text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors disabled:opacity-40`}
                        >
                            {cancelLabel}
                        </button>
                    )}
                    <button
                        ref={confirmRef}
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-colors disabled:opacity-40
                            ${type === 'error'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : type === 'warning'
                                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                                    : 'bg-[#00ff41] text-black hover:bg-[#00cc33]'
                            }`}
                    >
                        {loading ? '...' : confirmLabel}
                    </button>
                </div>

                {/* Corner scan line decorations */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${c.border} -translate-x-px -translate-y-px`} />
                <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${c.border} translate-x-px -translate-y-px`} />
                <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${c.border} -translate-x-px translate-y-px`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${c.border} translate-x-px translate-y-px`} />
            </div>

            <style>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.96); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    )
}

// ────────────────────────────────────────────────────────────
// SystemToast — notificação de canto (substitui toast simples)
// ────────────────────────────────────────────────────────────
interface SystemToastProps {
    open: boolean
    title: string
    desc?: string
    type?: 'error' | 'success' | 'warning' | 'info'
    onClose: () => void
}

export function SystemToast({ open, title, desc, type = 'info', onClose }: SystemToastProps) {
    useEffect(() => {
        if (!open) return
        const t = setTimeout(onClose, 5000)
        return () => clearTimeout(t)
    }, [open, onClose])

    if (!open) return null

    const colors = {
        error:   'border-red-500 text-red-400',
        success: 'border-[#00ff41] text-[#00ff41]',
        warning: 'border-yellow-400 text-yellow-400',
        info:    'border-[#00ff41] text-[#00ff41]',
    }

    return (
        <div className={`fixed bottom-6 right-6 z-[300] max-w-sm border-2 ${colors[type]} bg-black font-mono p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] animate-[fadeInScale_120ms_ease-out]`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest">{title}</p>
                    {desc && <p className="text-[11px] opacity-70 mt-1 leading-relaxed">{desc}</p>}
                </div>
                <button onClick={onClose} className="opacity-40 hover:opacity-100 text-lg leading-none">×</button>
            </div>
        </div>
    )
}
