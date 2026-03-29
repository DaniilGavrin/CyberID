'use client'

import { useEffect } from 'react'

interface StartAnimationPageProps {
    onComplete: () => void
}

export default function StartAnimationPage({ onComplete }: StartAnimationPageProps) {
    useEffect(() => {
        // Таймер загрузки (3 секунды)
        const timer = setTimeout(() => {
            onComplete()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
            {/* Фоновая сетка */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Угловые элементы */}
            <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-cyan-500/50 animate-pulse" />
            <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-cyan-500/50 animate-pulse" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-cyan-500/50 animate-pulse" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-cyan-500/50 animate-pulse" />

            {/* Логотип/загрузка */}
            <div className="relative z-10 text-center">
                <h1 className="text-[64px] font-black text-cyan-400 tracking-wider uppercase animate-pulse drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                    CyberID
                </h1>

                {/* Прогресс бар */}
                <div className="mt-8 w-64 h-1 bg-gray-900 rounded-full overflow-hidden mx-auto border border-cyan-900/50">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-[loading_3s_ease-in-out] w-full origin-left" />
                </div>

                {/* Текст загрузки */}
                <p className="text-cyan-600/80 text-sm mt-4 font-mono animate-pulse">
                    [ Инициализация системы... ]
                </p>

                {/* Декоративные символы */}
                <div className="mt-6 font-mono text-xs text-cyan-700/60 space-y-1">
                    <div className="animate-[fadeIn_0.5s_ease-in]">Loading modules...</div>
                    <div className="animate-[fadeIn_0.5s_ease-in_0.5s]">Checking integrity...</div>
                    <div className="animate-[fadeIn_0.5s_ease-in_1s]">Establishing secure connection...</div>
                </div>
            </div>

            {/* Анимированные линии */}
            <div className="absolute top-1/2 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" />
        </main>
    )
}