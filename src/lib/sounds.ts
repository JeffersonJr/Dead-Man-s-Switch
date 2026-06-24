'use client'

export const playSound = (type: 'beep' | 'reset' | 'alarm' | 'fail') => {
    if (typeof window === 'undefined') return

    const soundMap = {
        beep: '/sounds/beep.wav',
        reset: '/sounds/reset.wav',
        alarm: '/sounds/alarm.wav',
        fail: '/sounds/fail.wav',
    }

    const audio = new Audio(soundMap[type])
    audio.volume = 0.5

    if (type === 'alarm') {
        audio.loop = true
    }

    audio.play().catch(e => console.warn('Audio playback failed (interaction required):', e))

    return audio // Return for alarm control
}
