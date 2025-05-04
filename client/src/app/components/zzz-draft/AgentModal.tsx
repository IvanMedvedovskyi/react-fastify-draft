"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/app/api/axios";

type Agent = {
    id: string;
    name: string;
    icon: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const AgentModal = ({ isOpen, onClose }: Props) => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);

    useEffect(() => {
        if (isOpen) {
            // Імітація бекенду
            fetchAgents();
        }
    }, [isOpen]);

    const fetchAgents = async () => {
        const { data } = await api.get("/characters")
        console.log(data)
    };


    const toggleAgent = (agent: Agent) => {
        if (selectedAgents.find((a) => a.id === agent.id)) {
            setSelectedAgents((prev) => prev.filter((a) => a.id !== agent.id));
        } else {
            setSelectedAgents((prev) => [...prev, agent]);
        }
    };

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-[#1a1a1a] text-white w-[90vw] max-w-5xl h-[90vh] p-6 rounded-lg relative overflow-hidden flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Agent import</h2>

                {/* Закрыть */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-red-500"
                >
                    ✕
                </button>

                <div className="flex flex-1 overflow-hidden gap-4">
                    {/* Список всех агентов */}
                    {/* Список всех агентов (левая часть) */}
                    <div className="flex-1 overflow-y-auto pr-4">
                        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {agents.map((agent) => (
                                <div
                                    key={agent.id}
                                    onClick={() => toggleAgent(agent)}
                                    className={`rounded-md p-1 flex flex-col items-center justify-center text-center cursor-pointer border transition ${selectedAgents.find((a) => a.id === agent.id)
                                        ? "bg-[#333] border-[#805ad5]"
                                        : "bg-[#222] border-[#222] hover:border-[#555]"
                                        }`}
                                >
                                    <Image
                                        src={agent.icon}
                                        alt={agent.name}
                                        width={48}
                                        height={48}
                                        className="rounded"
                                    />
                                    <span className="mt-1 text-[11px] font-medium">{agent.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Выбранные агенты */}
                    <div className="w-60 border-l border-[#444] pl-4 flex flex-col justify-between">
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {selectedAgents.map((agent) => (
                                <div key={agent.id} className="relative">
                                    <Image
                                        src={agent.icon}
                                        alt={agent.name}
                                        width={48}
                                        height={48}
                                        className="rounded-md"
                                    />
                                    <button
                                        onClick={() => toggleAgent(agent)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                    <p className="text-sm mt-1">{agent.name}</p>
                                </div>
                            ))}
                        </div>

                        <button className="mt-4 py-2 bg-[#444] hover:bg-[#555] rounded-md font-semibold text-sm">
                            Copy from Hoyolab
                        </button>
                    </div>
                </div>

                {/* Save */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => {
                            // Можна відправити selectedAgents на бекенд
                            onClose();
                        }}
                        className="bg-[#805ad5] hover:bg-[#9f7aea] px-6 py-2 rounded-lg font-bold"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export { AgentModal };
