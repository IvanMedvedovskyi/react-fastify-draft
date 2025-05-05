"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/app/api/axios";
import { useCharactersStore, useUserStore } from "@/app/store";

type SelectedAgent = {
  id: string;
  level: number;
  awakening: number;
};

type AgentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agents: SelectedAgent[]) => void;
  initialSelectedAgents: SelectedAgent[];
};

const AgentModal: React.FC<AgentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSelectedAgents,
}) => {
  const { user, setUser } = useUserStore();
  const { characters, setCharacters } = useCharactersStore();
  const [selectedAgents, setSelectedAgents] = useState<SelectedAgent[]>([]);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [tempLevel, setTempLevel] = useState(1);
  const [tempAwakening, setTempAwakening] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchCharacters();
      setSelectedAgents(initialSelectedAgents);
    }
  }, [isOpen, initialSelectedAgents]);

  const fetchCharacters = async () => {
    try {
      const { data } = await api.get("/characters");
      setCharacters(data);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }
  };

  const handleOpenAgentSettings = (id: string) => {
    const agent = selectedAgents.find((a) => a.id === id);
    setTempLevel(agent?.level ?? 1);
    setTempAwakening(agent?.awakening ?? 0);
    setEditingAgentId(id);
  };

  const handleConfirmSettings = () => {
    if (!editingAgentId) return;

    setSelectedAgents((prev) => {
      const updated = prev.filter((a) => a.id !== editingAgentId);
      updated.push({
        id: editingAgentId,
        level: tempLevel,
        awakening: tempAwakening,
      });
      return updated;
    });

    setEditingAgentId(null);
  };

  const handleRemoveAgent = (id: string) => {
    setSelectedAgents((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveAgents = async () => {
    try {
      await api.post("/user/characters", {
        userId: user?.id,
        characters: selectedAgents.map((agent) => ({
          characterId: agent.id,
          rank: agent.level,
          mindscape: agent.awakening,
        })),
      });

      onSave(selectedAgents);

      const { data } = await api.get("/profile");
      setUser(data.user);
      onClose();
    } catch (error) {
      console.error("Failed to save agents:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative bg-gradient-to-br from-[#1f1f2b] to-[#2c2c3a] border border-[#6b46c1] rounded-xl w-[90vw] max-w-5xl h-[90vh] p-6 flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#9f7aea]">
            Select Your Agents
          </h2>
          <button
            onClick={onClose}
            className="text-3xl hover:text-red-500 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden gap-6">
          {/* Agents grid */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
              {characters.map((char) => {
                const isSelected = selectedAgents.some((a) => a.id === char.id);
                return (
                  <div
                    key={char.id}
                    onClick={() => handleOpenAgentSettings(char.id)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer group transition-all hover:scale-105 ${
                      isSelected
                        ? "border-2 border-yellow-400 bg-[#2f2f40]"
                        : "border border-[#444] bg-[#222]"
                    }`}
                    style={{ height: "130px" }} // <-- высота карточки больше
                  >
                    <Image
                      src={char.halfPortrait}
                      alt={char.en}
                      width={300}
                      height={300}
                      unoptimized
                      className="w-full h-full object-cover" // полностью заполняет
                    />
                    <div className="absolute bottom-0 w-full bg-black/60 text-xs text-white py-1 text-center">
                      {char.en}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Agents */}
          <div className="w-64 bg-[#1f1f2b] border-l border-[#444] p-4 rounded-xl flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {selectedAgents.map((agent) => {
                const char = characters.find((c) => c.id === agent.id);
                if (!char) return null;
                return (
                  <div
                    key={char.id}
                    className="relative flex items-center gap-4 p-3 bg-[#222] border border-[#805ad5] rounded-md hover:bg-[#333] transition-all"
                  >
                    <Image
                      src={char.icon}
                      alt={char.en}
                      width={56}
                      height={56}
                      unoptimized
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium">{char.en}</p>
                      <p className="text-sm text-gray-400">
                        Lv. {agent.level} • Awk. {agent.awakening}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveAgent(agent.id)}
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

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleSaveAgents}
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

        {/* Settings modal */}
        {editingAgentId && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#2a2a2a] p-6 rounded-lg w-80">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Agent Settings
              </h3>

              <div className="mb-6">
                <label className="block text-sm mb-2 text-white">Level</label>
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={tempLevel}
                  onChange={(e) => setTempLevel(Number(e.target.value))}
                  className="w-full h-2 bg-[#805ad5] rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-white text-sm mt-1">
                  {tempLevel}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2 text-white">
                  Awakening
                </label>
                <input
                  type="range"
                  min={0}
                  max={6}
                  value={tempAwakening}
                  onChange={(e) => setTempAwakening(Number(e.target.value))}
                  className="w-full h-2 bg-[#fbbf24] rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right text-white text-sm mt-1">
                  {tempAwakening}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setEditingAgentId(null)}
                  className="px-4 py-2 rounded-lg bg-[#444] hover:bg-[#555] text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSettings}
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
