"use client";

import React, { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { AgentModal } from "./AgentModal";
import Image from "next/image";
import { useCharactersStore } from "@/app/store";

type SelectedAgent = {
  id: string;
  level: number;
  awakening: number;
};

const ProfilePage = () => {
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);
  const [savedAgents, setSavedAgents] = useState<SelectedAgent[]>([]);
  const { characters } = useCharactersStore();

  const handleSaveAgents = (agents: SelectedAgent[]) => {
    setSavedAgents(agents);
    setAgentModalOpen(false);
  };

  const getCharacter = (id: string) => characters.find((char) => char.id === id);

  return (
    <div className="min-h-screen w-full bg-[#0b0b11] text-white px-4 sm:px-6 py-10 font-orbitron">
      <ProfileHeader />

      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#c5d0ff] tracking-widest uppercase">
          Your Agents
        </h2>

        {savedAgents.length === 0 ? (
          <p className="text-[#5c5f77] italic mb-6">No agents added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-start">
            {savedAgents.map((agent, idx) => {
              const char = getCharacter(agent.id);
              if (!char) return null;

              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-[#1b1c2e] to-[#0f1020] rounded-xl p-2 w-[120px] flex-shrink-0 border border-[#3c3c5a] shadow-md hover:shadow-neon-blue transition-all relative group"
                >
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-1 border border-[#3e3e4e]">
                    <Image
                      src={char.icon}
                      alt={char.en}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="text-center text-[#e3e6ff] text-[10px] font-semibold truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                    {char.en}
                  </h3>

                  <div className="flex justify-center gap-1 mt-0.5 text-[12px]">
                    <span className="bg-[#2d2f45] text-[#9ba2df] px-1.5 py-0.5 rounded-full shadow-inner">
                      Lv. {agent.level}
                    </span>
                    <span className="bg-[#2d2f45] text-[#9ba2df] px-1.5 py-0.5 rounded-full shadow-inner">
                      Awk. {agent.awakening}
                    </span>
                  </div>

                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#7c90ff] transition-all pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setAgentModalOpen(true)}
          className="mt-6 bg-[#1e2030] border border-[#4a4a6a] text-[#cfd3ff] px-5 py-2 rounded-md font-bold hover:bg-[#2a2c3a] hover:shadow-neon-blue transition-all"
        >
          Manage agents
        </button>

        <AgentModal
          isOpen={isAgentModalOpen}
          onClose={() => setAgentModalOpen(false)}
          onSave={handleSaveAgents}
        />
      </div>
    </div>
  );
};

export { ProfilePage };
