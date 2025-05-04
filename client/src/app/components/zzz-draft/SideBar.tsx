"use client";

import React, { useEffect, useRef } from "react";
import { SidebarMenu, useSectionStore } from "@/app/store";
import { Home, User, FlaskConical, Trophy, Settings } from "lucide-react";

const SYMBOL = "夢";

const menuItems = [
    { id: 1, label: "HOME", icon: <Home size={20} />, value: SidebarMenu.Home },
    { id: 2, label: "PROFILE", icon: <User size={20} />, value: SidebarMenu.Profile },
    { id: 3, label: "DRAFTS", icon: <FlaskConical size={20} />, value: SidebarMenu.Drafts },
    { id: 4, label: "TOURNAMENTS", icon: <Trophy size={20} />, value: SidebarMenu.Tournaments },
    { id: 5, label: "DRAFT SYSTEMS", icon: <Settings size={20} />, value: SidebarMenu.DraftSystems },
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

        const petals = Array.from({ length: 50 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 1,
            speedX: Math.random() * 0.6 - 0.3,
            speedY: Math.random() * 1 + 0.5,
            angle: Math.random() * Math.PI * 2,
        }));

        const drawSymbol = () => {
            ctx.save();
            ctx.font = "80px serif";
            ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
            ctx.textAlign = "center";
            ctx.fillText(SYMBOL, width / 2, height / 2);
            ctx.restore();
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            drawSymbol();

            petals.forEach((p) => {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 182, 193, 0.6)";
                ctx.ellipse(p.x, p.y, p.r * 1.2, p.r, p.angle, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;
                p.angle += 0.01;

                if (p.y > height) p.y = -10;
                if (p.x > width || p.x < 0) p.x = Math.random() * width;
            });
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="relative min-w-[280px] max-w-[280px] bg-[#120d1f] p-5 flex flex-col justify-between min-h-screen overflow-hidden shadow-xl border-r border-[#241b35]">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
            />
            <nav className="space-y-3 relative z-10">
                {menuItems.map((item) => {
                    const isActive = activeSection === item.value;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.value)}
                            className={`
                                w-full py-3 px-4 rounded-lg text-left font-semibold uppercase tracking-wide 
                                flex items-center gap-3 relative z-10 overflow-hidden group transition-all duration-300
                                transform-gpu will-change-transform
                                ${isActive
                                    ? "bg-gradient-to-r from-[#9f7aea] to-[#805ad5] text-white shadow-[0_0_15px_#9f7aea44] animate-pulse-slow"
                                    : "bg-[#1a132d] hover:bg-[#261d3f] text-[#cbb9f8] hover:scale-[1.03] hover:shadow-[0_0_12px_#9f7aea33]"
                                }
                            `}
                        >
                            <div className={`absolute inset-0 rounded-lg border transition-all duration-300 
                                ${isActive
                                    ? "border-[#bb9eff]"
                                    : "border-transparent group-hover:border-[#6b46c1]"}`} />

                            <span
                                className={`z-10 transition-all duration-300
                                    ${isActive ? "text-white" : "group-hover:translate-x-1"}`}
                            >
                                {item.icon}
                            </span>
                            <span className="z-10">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export { SideBar };
