"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/app/api/axios";
import { useCharactersStore } from "@/app/store";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type SelectedAgent = {
    id: string;
    level: number;
    awakening: number;
};

const AgentModal = ({ isOpen, onClose }: Props) => {
    const { setCharacters, characters } = useCharactersStore();
    const [selectedAgents, setSelectedAgents] = useState<SelectedAgent[]>([]);
    const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);
    const [tempLevel, setTempLevel] = useState(1);
    const [tempAwakening, setTempAwakening] = useState(0);

    useEffect(() => {
        if (isOpen) {
            fetchAgents();
        }
    }, [isOpen]);

    const fetchAgents = async () => {
        const { data } = await api.get("/characters");
        setCharacters(data);
    };

    const openSettings = (id: string) => {
        const existing = selectedAgents.find((a) => a.id === id);
        setTempLevel(existing?.level || 1);
        setTempAwakening(existing?.awakening || 0);
        setCurrentAgentId(id);
    };

    const confirmSettings = () => {
        if (!currentAgentId) return;

        setSelectedAgents((prev) => {
            const filtered = prev.filter((a) => a.id !== currentAgentId);
            return [
                ...filtered,
                {
                    id: currentAgentId,
                    level: tempLevel,
                    awakening: tempAwakening,
                },
            ];
        });
        setCurrentAgentId(null);
    };

    const removeAgent = (id: string) => {
        setSelectedAgents((prev) => prev.filter((a) => a.id !== id));
    };

    const getCharacter = (id: string) =>
        characters.find((char) => char.id === id);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-[#1a1a1a] text-white w-[90vw] max-w-5xl h-[90vh] p-6 rounded-lg relative overflow-hidden flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Agent import</h2>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-red-500"
                >
                    ✕
                </button>

                <div className="flex flex-1 overflow-hidden gap-4">
                    <div className="flex-1 overflow-y-auto p-1">
                        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {characters.map((agent) => (
                                <div
                                    key={agent.id}
                                    onClick={() => openSettings(agent.id)}
                                    className={`relative rounded-md p-2 flex flex-col items-center justify-center text-center cursor-pointer border transition-transform transform hover:scale-105 hover:shadow-lg ${
                                        selectedAgents.find((a) => a.id === agent.id)
                                            ? "bg-[#333] border-[#805ad5]"
                                            : "bg-[#222] border-[#222] hover:border-[#555]"
                                    }`}
                                >
                                    <Image
                                        src={agent.icon}
                                        alt={agent.en}
                                        width={64}
                                        height={64}
                                        unoptimized
                                        className="rounded"
                                    />
                                    <span className="mt-1 text-xs font-medium">{agent.en}</span>                             
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-60 border-l border-[#444] pl-4 flex flex-col justify-between">
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {selectedAgents.map((a) => {
                                const agent = getCharacter(a.id);
                                if (!agent) return null;
                                return (
                                    <div key={agent.id} className="relative flex items-center gap-3">
                                        <Image
                                            src={agent.icon}
                                            alt={agent.en}
                                            width={48}
                                            height={48}
                                            unoptimized
                                            className="rounded-md"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm">{agent.en}</p>
                                            <p className="text-xs text-gray-400">
                                                Lv. {a.level} • Awk. {a.awakening}
                                            </p>
                                        </div>
                                        {/* Remove icon */}
                                        <button
                                            onClick={() => removeAgent(agent.id)}
                                            className="text-red-500 text-xl hover:text-red-700 cursor-pointer"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => {
                            console.log("Saving: ", selectedAgents);
                            onClose();
                        }}
                        className="bg-[#805ad5] hover:bg-[#9f7aea] px-6 py-2 rounded-lg font-bold ursor-pointer"
                    >
                        Save
                    </button>
                </div>

                {/* Modal for level and awakening settings */}
                {currentAgentId && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                        <div className="bg-[#2a2a2a] p-6 rounded-lg w-80">
                            <h3 className="text-xl font-semibold mb-4">Настройки персонажа</h3>

                            <div className="mb-4">
                                <label className="block text-sm mb-1">Уровень</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min={1}
                                        max={60}
                                        value={tempLevel}
                                        onChange={(e) => setTempLevel(Number(e.target.value))}
                                        className="w-full h-2 bg-gradient-to-r from-[#805ad5] to-[#805ad5] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-sm w-8 text-right">{tempLevel}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-1">Пробуждение</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min={0}
                                        max={6}
                                        value={tempAwakening}
                                        onChange={(e) => setTempAwakening(Number(e.target.value))}
                                        className="w-full h-2 bg-gradient-to-r from-[#fbbf24] to-[#fbbf24] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-sm w-4 text-right">{tempAwakening}</span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setCurrentAgentId(null)}
                                    className="px-4 py-1 rounded bg-[#444] ursor-pointer"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={confirmSettings}
                                    className="px-4 py-1 rounded bg-[#805ad5] hover:bg-[#9f7aea] ursor-pointer"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { AgentModal };
