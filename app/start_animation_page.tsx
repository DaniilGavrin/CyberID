'use client'

import { useState, useEffect } from 'react'

interface StartAnimationPageProps {
    onComplete: () => void
}

interface SystemMessage {
    id: number
    text: string
    status: 'pending' | 'loading' | 'completed'
}

export default function StartAnimationPage({ onComplete }: StartAnimationPageProps) {
    const [phase, setPhase] = useState<'corners' | 'title' | 'messages' | 'transition'>('corners')
    const [rotation, setRotation] = useState(0)
    const [messages, setMessages] = useState<SystemMessage[]>([
        { id: 1, text: 'Initializing core modules', status: 'pending' },
        { id: 2, text: 'Loading authentication protocols', status: 'pending' },
        { id: 3, text: 'Verifying security certificates', status: 'pending' },
        { id: 4, text: 'Establishing secure connection', status: 'pending' },
        { id: 5, text: 'Calibrating neural interfaces', status: 'pending' },
        { id: 6, text: 'System ready', status: 'pending' },
    ])

    // Анимация вращения "/"
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prev) => (prev + 90) % 360)
        }, 150)
        return () => clearInterval(interval)
    }, [])

    // Последовательность фаз
    useEffect(() => {
        const CORNERS_DURATION = 2000
        const TITLE_DURATION = 1500
        const MESSAGE_START_DELAY = 500
        const MESSAGE_INTERVAL = 2000
        const MESSAGE_LOADING_TIME = 1000
        const TRANSITION_BUFFER = 500
        const TRANSITION_DURATION = 800 // Уменьшил для резкости

        const cornersTimer = setTimeout(() => setPhase('title'), CORNERS_DURATION)
        const titleTimer = setTimeout(() => setPhase('messages'), CORNERS_DURATION + TITLE_DURATION)

        messages.forEach((_, index) => {
            const messageStartTime = CORNERS_DURATION + TITLE_DURATION + MESSAGE_START_DELAY + index * MESSAGE_INTERVAL

            setTimeout(() => {
                setMessages((prev) =>
                    prev.map((msg, i) => (i === index ? { ...msg, status: 'loading' } : msg))
                )
            }, messageStartTime)

            setTimeout(() => {
                setMessages((prev) =>
                    prev.map((msg, i) => (i === index ? { ...msg, status: 'completed' } : msg))
                )
            }, messageStartTime + MESSAGE_LOADING_TIME)
        })

        const lastMessageStart = CORNERS_DURATION + TITLE_DURATION + MESSAGE_START_DELAY + (messages.length - 1) * MESSAGE_INTERVAL
        const transitionTimer = setTimeout(() => {
            setPhase('transition')
            setTimeout(() => onComplete(), TRANSITION_DURATION)
        }, lastMessageStart + MESSAGE_INTERVAL + TRANSITION_BUFFER)

        return () => {
            clearTimeout(cornersTimer)
            clearTimeout(titleTimer)
            clearTimeout(transitionTimer)
        }
    }, [])

    return (
        // 🔥 FIX: Убрал transition-opacity с main, чтобы не было белых вспышек.
        // Переход управляется через отдельный оверлей.
        <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">

            {/* Фоновая сетка */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Угловые элементы */}
            <CornerAnimation phase={phase} position="top-left" delay={0} />
            <CornerAnimation phase={phase} position="top-right" delay={200} />
            <CornerAnimation phase={phase} position="bottom-left" delay={400} />
            <CornerAnimation phase={phase} position="bottom-right" delay={600} />

            {/* Основной контент */}
            <div className="relative z-10 text-center flex flex-col items-center justify-center">

                {/* 🔥 FIX: Заголовок - эффект "включения" (свечение + масштаб) */}
                <h1
                    className={`font-black tracking-wider uppercase transition-all duration-1000 ${
                        phase === 'corners'
                            ? 'opacity-0 scale-110 blur-xl text-cyan-900' // Исходное: размытый, тёмный, большой
                            : phase === 'title' || phase === 'messages'
                                ? 'text-[80px] opacity-100 scale-100 blur-0 text-cyan-400 animate-[glitch_0.5s_ease-in-out_2] drop-shadow-[0_0_30px_rgba(34,211,238,1)]' // Активное: чёткий, яркий
                                : 'opacity-0 scale-95 blur-md text-cyan-400' // Уход: сжатие + размытие
                    }`}
                >
                    CyberID Project
                </h1>

                {/* Подзаголовок */}
                <p
                    className={`text-cyan-600/80 text-lg font-mono tracking-wide transition-all duration-700 ${
                        phase === 'messages' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    // ID Provider нового поколения
                </p>

                {/* Системные сообщения */}
                <div className={`mt-8 font-mono text-sm space-y-2 transition-all duration-500 ${
                    phase === 'messages' ? 'opacity-100' : 'opacity-0'
                }`}>
                    {messages.map((msg, index) => (
                        <div
                            key={msg.id}
                            className={`flex items-center gap-4 justify-center transition-all duration-500 ${
                                msg.status === 'pending' ? 'opacity-0 translate-y-2' :
                                    msg.status === 'loading' ? 'opacity-100 translate-y-0' :
                                        'opacity-50 -translate-y-1'
                            }`}
                        >
              <span className={`transition-colors duration-300 ${
                  msg.status === 'completed' ? 'text-cyan-600' : 'text-cyan-400'
              }`}>
                {msg.text}
              </span>

                            {msg.status === 'loading' && (
                                <span
                                    className="text-cyan-400 font-bold"
                                    style={{
                                        display: 'inline-block',
                                        transform: `rotate(${rotation}deg)`,
                                        transition: 'transform 0.15s linear'
                                    }}
                                >
                  /
                </span>
                            )}

                            {msg.status === 'completed' && (
                                <span className="text-green-400 font-bold drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
                  [OK]
                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* ACCESS GRANTED */}
                {phase === 'transition' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-green-400 text-3xl font-mono font-bold animate-[pulse_0.5s_ease-in-out_3] drop-shadow-[0_0_30px_rgba(74,222,128,1)] tracking-wider">
                            &gt; ACCESS GRANTED
                        </p>
                    </div>
                )}
            </div>

            {/* Декоративные линии */}
            <div className={`absolute top-1/2 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transition-opacity duration-1000 ${
                phase === 'corners' ? 'opacity-0' : 'opacity-100 animate-pulse'
            }`} />
            <div className={`absolute top-1/2 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transition-opacity duration-1000 delay-300 ${
                phase === 'corners' ? 'opacity-0' : 'opacity-100 animate-pulse'
            }`} />

            {/* 🔥 FIX: Оверлей для плавного затемнения вместо белого фона
            //<div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-800 z-50 ${
                phase === 'transition' ? 'opacity-100' : 'opacity-0'
            }`} />
            */}
        </main>
    )
}

// Компонент углов
function CornerAnimation({ phase, position, delay }: {
    phase: string,
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
    delay: number
}) {
    const borderClasses = {
        'top-left': 'border-l-2 border-t-2',
        'top-right': 'border-r-2 border-t-2',
        'bottom-left': 'border-l-2 border-b-2',
        'bottom-right': 'border-r-2 border-b-2',
    }

    const positionClasses = {
        'top-left': 'top-10 left-10',
        'top-right': 'top-10 right-10',
        'bottom-left': 'bottom-10 left-10',
        'bottom-right': 'bottom-10 right-10',
    }

    return (
        <div
            className={`absolute w-20 h-20 transition-all duration-1000 ${positionClasses[position]} ${borderClasses[position]} ${
                phase === 'corners'
                    ? 'border-cyan-500/50 animate-[drawCorner_1s_ease-out_forwards] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                    : 'border-cyan-500/20'
            }`}
            style={{ animationDelay: `${delay}ms` }}
        />
    )
}