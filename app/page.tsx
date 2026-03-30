// import Image from "next/image";
'use client'

import { useState } from 'react'
import StartAnimationPage from './start_animation_page'
import DetailsScreenMain from './screens/details_screen_main'

export default function Home() {
    const [showMainContent, setShowMainContent] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    // Показываем анимацию загрузки при первом входе
    if (!showMainContent) {
        return <StartAnimationPage onComplete={() => setShowMainContent(true)} />
    }

    // Основная страница
    return (
        <>
            <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
                {/* Фоновая сетка */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* Угловые элементы */}
                <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-cyan-500/50" />
                <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-cyan-500/50" />
                <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-cyan-500/50" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-cyan-500/50" />

                <div className="relative z-10 text-center">

                    {/* Заголовок */}
                    <h1 className="text-[64px] font-black text-cyan-400 animate-slide-up mt-[-200px] tracking-wider uppercase animate-glitch cursor-pointer" data-text="CyberID Project">
                            CyberID Project
                    </h1>

                    <p className="text-cyan-600/80 text-lg mt-4 animate-slide-up font-mono tracking-wide" style={{animationDelay: '0.2s'}}>
                        // ID Provider нового поколения
                    </p>

                    {/* Кнопки */}
                    <div className="flex gap-6 mt-12 animate-slide-up justify-center" style={{animationDelay: '0.4s'}}>

                        {/* Кнопка "Начать работу" */}
                        <button className="group relative px-8 py-3 bg-cyan-950/30 border border-cyan-500/50 text-cyan-400 font-mono font-semibold uppercase tracking-wider hover:bg-cyan-500/20 transition-all duration-300 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-400/20 before:-translate-x-full hover:before:translate-x-full before:transition-all before:duration-700">
                          <span className="relative drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,1)] transition-all duration-300 inline-block group-hover:translate-x-1">
                            &gt; Начать работу &gt;
                          </span>
                          <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>

                        {/* 👇 Кнопка "Подробнее" с открытием модалки */}
                        <button onClick={() => setShowDetails(true)} className="group relative px-8 py-3 bg-cyan-950/30 border border-cyan-700/30 text-cyan-600 font-mono font-semibold uppercase tracking-wider hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                          <span className="relative group-hover:tracking-widest transition-all duration-300">
                            [ Подробнее ]
                          </span>
                        </button>

                    </div>
                </div>

                {/* Декоративные линии */}
                <div className="absolute top-1/2 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" />
            </main>

            {/* 👇 Модальное окно */}
            <DetailsScreenMain isOpen={showDetails} onClose={() => setShowDetails(false)}/>
        </>
    )
}