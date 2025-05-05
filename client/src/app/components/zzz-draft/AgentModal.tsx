"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/app/api/axios";
import { useCharactersStore } from "@/app/store";

type SelectedAgent = {
  id: string;
  level: number;
  awakening: number;
};

type AgentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agents: SelectedAgent[]) => void;
};

const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose, onSave }) => {
  const { setCharacters, characters } = useCharactersStore();
  const [selectedAgents, setSelectedAgents] = useState<SelectedAgent[]>([]);
  const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);
  const [tempLevel, setTempLevel] = useState(1);
  const [tempAwakening, setTempAwakening] = useState(0);

  useEffect(() => {
    if (isOpen) fetchAgents();
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
      return [...filtered, { id: currentAgentId, level: tempLevel, awakening: tempAwakening }];
    });
    setCurrentAgentId(null);
  };

  const removeAgent = (id: string) => {
    setSelectedAgents((prev) => prev.filter((a) => a.id !== id));
  };

  const getCharacter = (id: string) => characters.find((char) => char.id === id);

  const handleSave = () => {
    onSave(selectedAgents);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gradient-to-br from-[#1f1f2b] to-[#2c2c3a] text-white w-[90vw] max-w-5xl h-[90vh] p-6 rounded-xl relative overflow-hidden flex flex-col border border-[#6b46c1] shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-[#9f7aea]">Select Your Agents</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-all"
        >
          ✕
        </button>

        <div className="flex flex-1 overflow-hidden gap-6">
          {/* Grid with all agents */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {characters.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => openSettings(agent.id)}
                  className={`relative rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer border transition-all hover:bg-[#333] ${
                    selectedAgents.find((a) => a.id === agent.id)
                      ? "bg-[#292042] border-[#805ad5]"
                      : "bg-[#333] border-[#444]"
                  } hover:scale-105 hover:shadow-2xl`}
                >
                  <Image
                    src={agent.icon}
                    alt={agent.en}
                    width={72}
                    height={72}
                    unoptimized
                    className="rounded-md"
                  />
                  <span className="mt-2 text-sm font-semibold text-white">{agent.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected agent summary */}
          <div className="w-64 border-l border-[#444] pl-6 flex flex-col justify-between bg-[#1f1f2b] rounded-xl p-4">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {selectedAgents.map((a) => {
                const agent = getCharacter(a.id);
                if (!agent) return null;
                return (
                  <div
                    key={agent.id}
                    className="relative flex items-center gap-4 bg-[#222] p-3 rounded-md border border-[#805ad5] hover:bg-[#333] transition-all"
                  >
                    <Image
                      src={agent.icon}
                      alt={agent.en}
                      width={56}
                      height={56}
                      unoptimized
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium text-[#e2e8f0]">{agent.en}</p>
                      <p className="text-sm text-gray-400">
                        Lv. {a.level} • Awk. {a.awakening}
                      </p>
                    </div>
                    <button
                      onClick={() => removeAgent(agent.id)}
                      className="text-red-500 hover:text-red-700 text-xl transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="bg-[#805ad5] hover:bg-[#9f7aea] px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-[#444] hover:bg-[#555] px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Cancel
          </button>
        </div>

        {/* Modal settings */}
        {currentAgentId && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#2a2a2a] p-6 rounded-lg w-80">
              <h3 className="text-xl font-semibold mb-4 text-white">Agent Settings</h3>

              <div className="mb-6">
                <label className="block text-sm mb-1">Level</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={tempLevel}
                    onChange={(e) => setTempLevel(Number(e.target.value))}
                    className="w-full h-2 bg-[#805ad5] rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-white w-8 text-right">{tempLevel}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-1">Awakening</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={6}
                    value={tempAwakening}
                    onChange={(e) => setTempAwakening(Number(e.target.value))}
                    className="w-full h-2 bg-[#fbbf24] rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-white w-4 text-right">{tempAwakening}</span>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setCurrentAgentId(null)}
                  className="px-4 py-2 rounded-lg bg-[#444] hover:bg-[#555] text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSettings}
                  className="px-4 py-2 rounded-lg bg-[#805ad5] hover:bg-[#9f7aea] text-white"
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
