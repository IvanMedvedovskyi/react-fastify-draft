"use client"

import React, { useEffect, useRef } from 'react'
import { SidebarMenu, useSectionStore } from '@/app/store'
import {
    Home,
    User,
    FlaskConical,
    Trophy,
    Settings,
} from 'lucide-react'

const menuItems = [
    { id: 1, label: 'Home', icon: <Home size={18} />, value: SidebarMenu.Home },
    { id: 2, label: 'Profile', icon: <User size={18} />, value: SidebarMenu.Profile },
    { id: 3, label: 'Drafts', icon: <FlaskConical size={18} />, value: SidebarMenu.Drafts },
    { id: 4, label: 'Tournaments', icon: <Trophy size={18} />, value: SidebarMenu.Tournaments },
    { id: 5, label: 'Draft Systems', icon: <Settings size={18} />, value: SidebarMenu.DraftSystems },
]

const SideBar = () => {
    const { activeSection, setActiveSection } = useSectionStore()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Matrix rain effect
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const width = canvas.width = 300
        const height = canvas.height = window.innerHeight

        const letters = "アァイイウエカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789".split("")
        const fontSize = 14
        const columns = Math.floor(width / fontSize)
        const drops: number[] = Array(columns).fill(1)

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
            ctx.fillRect(0, 0, width, height)

            ctx.fillStyle = "#a3e635"
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)]
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                drops[i]++
            }
        }

        const interval = setInterval(draw, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet" />
            <style>{`
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 10px rgba(163, 230, 53, 0.8); }
                    50% { box-shadow: 0 0 20px rgba(163, 230, 53, 1); }
                }

                @keyframes glitch {
                    0% { transform: translate(0); opacity: 1; }
                    20% { transform: translate(-1px, 1px); opacity: 0.9; }
                    40% { transform: translate(1px, -1px); opacity: 1; }
                    60% { transform: translate(-2px, 2px); opacity: 0.95; }
                    80% { transform: translate(2px, -2px); opacity: 1; }
                    100% { transform: translate(0); opacity: 1; }
                }

                .orbitron {
                    font-family: 'Orbitron', sans-serif;
                }

                .glitch {
                    animation: glitch 1s infinite;
                }

                .glow-border {
                    animation: glow 2s infinite ease-in-out;
                }
            `}</style>

            <aside className="relative w-64 bg-black p-4 flex flex-col justify-between shadow-lg min-h-screen overflow-hidden">
                {/* Matrix rain canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full opacity-20 z-0"
                />

                {/* Menu on top */}
                <nav className="space-y-4 relative z-10">
                    {menuItems.map(item => {
                        const isActive = activeSection === item.value
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.value)}
                                className={`relative group w-full text-left px-4 py-3 rounded-xl transition-all duration-500 overflow-hidden
                                    ${isActive
                                        ? 'bg-gradient-to-r from-lime-400 to-yellow-300 text-black scale-105 glow-border'
                                        : 'bg-zinc-900 text-white hover:bg-gradient-to-r hover:from-lime-300 hover:to-yellow-200 hover:text-black hover:scale-105 active:scale-95'}
                                `}
                            >
                                <span className="absolute inset-0 bg-[radial-gradient(circle,_rgba(163,230,53,0.1)_0%,_transparent_70%)] blur-2xl opacity-40 group-hover:opacity-60 transition" />
                                <span className="relative z-10 flex items-center gap-3 orbitron uppercase tracking-wide">
                                    <span className="text-lime-300">{item.icon}</span>
                                    <span className={`${isActive ? 'glitch' : ''}`}>{item.label}</span>
                                </span>
                            </button>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}

export { SideBar }
