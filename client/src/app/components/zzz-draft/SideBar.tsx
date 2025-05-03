"use client";

import React, { useEffect, useRef } from "react";
import { SidebarMenu, useSectionStore } from "@/app/store";
import {
    Home,
    User,
    FlaskConical,
    Trophy,
    Settings,
} from "lucide-react";

const menuItems = [
    { id: 1, label: "Home", icon: <Home size={18} />, value: SidebarMenu.Home },
    { id: 2, label: "Profile", icon: <User size={18} />, value: SidebarMenu.Profile },
    { id: 3, label: "Drafts", icon: <FlaskConical size={18} />, value: SidebarMenu.Drafts },
    { id: 4, label: "Tournaments", icon: <Trophy size={18} />, value: SidebarMenu.Tournaments },
    { id: 5, label: "Draft Systems", icon: <Settings size={18} />, value: SidebarMenu.DraftSystems },
];

const SideBar = () => {
    const { activeSection, setActiveSection } = useSectionStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width = 300;
        const height = canvas.height = window.innerHeight;

        const letters = "アァイイウエカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789".split("");
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops: number[] = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#0ff"; // Neon cyan color
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-w-[280px] max-w-[280px] bg-[#111111] p-4 flex flex-col justify-between shadow-lg min-h-screen overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full opacity-20 z-0"
            />

            <nav className="space-y-4 relative z-10">
                {menuItems.map((item) => {
                    const isActive = activeSection === item.value;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.value)}
                            className={`cursor-pointer relative group w-full text-left px-4 py-3 rounded-xl transition-all duration-500 overflow-hidden
                                ${isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black scale-105' : 'bg-zinc-800 text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 hover:text-black hover:scale-105 active:scale-95'}
                                ${isActive ? 'glow-border' : ''}
                            `}
                        >
                            <span className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,255,255,0.1)_0%,_transparent_70%)] blur-2xl opacity-40 group-hover:opacity-60 transition" />
                            <span className="relative z-10 flex items-center gap-3 font-orbitron uppercase tracking-wide">
                                <span className="text-cyan-300">{item.icon}</span>
                                <span className={`${isActive ? 'glitch' : ''}`}>{item.label}</span>
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>

    );
};

export { SideBar };
