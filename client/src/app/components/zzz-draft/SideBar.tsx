"use client"

import { SidebarMenu, useSectionStore } from '@/app/store'
import React from 'react'

const menuItems = [
    { id: 1, label: '🏠 Home', value: SidebarMenu.Home },
    { id: 2, label: '👤 Profile', value: SidebarMenu.Profile },
    { id: 3, label: '🧪 Drafts', value: SidebarMenu.Drafts },
    { id: 4, label: '🏆 Tournaments', value: SidebarMenu.Tournaments },
    { id: 5, label: '⚙️ Draft systems', value: SidebarMenu.DraftSystems },
]

const SideBar = () => {
    const { activeSection, setActiveSection } = useSectionStore()

    return (
        <div>
            <aside className="w-64 bg-black p-4 flex flex-col justify-between shadow-lg min-h-screen">
                <div>
                    <nav className="space-y-4">
                        {menuItems.map(item => {
                            const isActive = activeSection === item.value
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.value)}
                                    className={`cursor-pointer w-full text-left p-2 rounded transition
                                        ${isActive ? 'bg-lime-400 text-black' : 'bg-zinc-800 text-white hover:bg-lime-400 hover:text-black'}
                                    `}
                                >
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export { SideBar }
