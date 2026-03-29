'use client'

import { useEffect } from 'react'

interface DetailsScreenProps {
    isOpen: boolean
    onClose: () => void
}

export default function DetailsScreenMain({ isOpen, onClose }: DetailsScreenProps) {
    // Блокируем скролл фона
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Закрытие по Esc
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEsc)
        }
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    // Не рендерим ничего, если закрыто
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            {/* Затемнение фона — плавное появление */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-[fadeIn_0.4s_ease-out]"
                onClick={onClose}
            />

            {/* Само окно — glassmorphism эффект */}
            <div className="relative z-10 w-full max-w-2xl animate-[modalSlideIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">

                {/* Стеклянное окно */}
                <div className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_50px_rgba(34,211,238,0.1)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/5 before:via-transparent before:to-purple-500/5 before:pointer-events-none">

                    {/* Угловые декоративные элементы */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/60" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/60" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60" />

                    {/* Кнопка закрытия (справа сверху) */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-cyan-400/80 hover:text-cyan-200 hover:bg-cyan-500/20 rounded transition-all duration-300 group z-20"
                        aria-label="Закрыть"
                    >
            <span className="text-3xl font-light group-hover:rotate-90 transition-transform duration-300">
              ×
            </span>
                    </button>

                    {/* Заголовок */}
                    <div className="relative p-6 pb-4 border-b border-cyan-500/20">
                        <h2 className="text-2xl font-black text-cyan-300 tracking-wider uppercase drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                            О проекте
                        </h2>
                        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                    </div>

                    {/* Контент */}
                    <div
                        className="relative p-6 font-mono text-sm text-cyan-200/80 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {/* 👇 ВСТАВЬ СЮДА СВОЙ ТЕКСТ 👇 */}
                        <p>
                            // CyberID Project — ID Provider нового поколения
                        </p>
                        <p>
                            &gt; Инициализация модулей аутентификации... <span className="text-green-400">[OK]</span>
                        </p>
                        <p>
                            &gt; Проверка сертификатов безопасности... <span className="text-green-400">[OK]</span>
                        </p>
                        <p>
                            &gt; Установка защищённого соединения... <span className="text-green-400">[OK]</span>
                        </p>

                        <p>
                            &gt; Статус: <span
                            className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">ACTIVE</span>
                        </p>
                        <p>
                            &gt; Версия протокола: <span
                            className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">v0.0.4</span>
                        </p>
                        <p>
                            &gt; Шифрование: <span className="text-cyan-300">AES-256</span>
                        </p>

                        <div className="mt-6 p-4 bg-cyan-950/20 border border-cyan-500/20 rounded backdrop-blur-sm">
                            <p className="text-cyan-400/90">
                                [СИСТЕМНАЯ ИНФОРМАЦИЯ]
                            </p>
                            <p className="mt-2 text-cyan-200/70">
                                Здесь будет подробное описание проекта,
                                технические характеристики, документация
                                и всё остальное, что нужно знать пользователю.
                            </p>
                        </div>

                        {/* 👆 КОНЕЦ ТЕКСТА 👆 */}
                    </div>

                    {/* Футер */}
                    <div className="relative p-4 pt-2 border-t border-cyan-500/20 flex justify-end bg-black/20">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-cyan-950/30 border border-cyan-500/40 text-cyan-300 font-mono font-semibold uppercase tracking-wider hover:bg-cyan-500/20 hover:border-cyan-400/60 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300"
                        >
                            [ Закрыть ]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}