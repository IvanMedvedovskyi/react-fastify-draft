"use client";

import React, { useState, useRef, useEffect } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { AgentModal } from "./AgentModal";

const ProfilePage = () => {
  const [openDropdown, setOpenDropdown] = useState<null | "search" | "costs">(null);
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const costsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target as Node) &&
      costsRef.current &&
      !costsRef.current.contains(e.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <div className="min-h-screen w-full bg-[#0b0c10] text-white p-8 font-orbitron relative">
      <ProfileHeader />

      {/* Top buttons with dropdowns */}
      <div className="flex justify-end mt-6 gap-4 relative">
        {/* Search profile dropdown */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => setOpenDropdown((prev) => (prev === "search" ? null : "search"))}
            className="bg-gradient-to-r from-[#805ad5] to-[#6b46c1] hover:from-[#9f7aea] hover:to-[#805ad5] text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest shadow-[0_0_10px_#805ad5aa] transition-all duration-300"
          >
            Search profile ⌄
          </button>

          {openDropdown === "search" && (
            <div className="absolute right-0 mt-2 w-64 bg-[#1a1a2e] border border-[#805ad5] rounded-xl shadow-lg p-4 animate-fade-in-up z-50">
              <p className="text-sm text-gray-300 mb-2">Enter username:</p>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full px-3 py-2 rounded-md bg-black border border-[#805ad5] text-white focus:outline-none focus:ring-2 focus:ring-[#9f7aea]"
              />
              <button className="mt-3 w-full bg-gradient-to-r from-[#9f7aea] to-[#6b46c1] text-white py-2 rounded-md font-bold hover:opacity-90 transition">
                Search
              </button>
            </div>
          )}
        </div>

        {/* Calculate costs dropdown */}
        <div ref={costsRef} className="relative">
          <button
            onClick={() => setOpenDropdown((prev) => (prev === "costs" ? null : "costs"))}
            className="bg-gradient-to-r from-[#805ad5] to-[#6b46c1] hover:from-[#9f7aea] hover:to-[#805ad5] text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest shadow-[0_0_10px_#805ad5aa] transition-all duration-300"
          >
            Calculate costs ⌄
          </button>

          {openDropdown === "costs" && (
            <div className="absolute right-0 mt-2 w-64 bg-[#1a1a2e] border border-[#805ad5] rounded-xl shadow-lg p-4 animate-fade-in-up z-50">
              <p className="text-sm text-gray-300 mb-2">Enter agent count:</p>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-md bg-black border border-[#805ad5] text-white focus:outline-none focus:ring-2 focus:ring-[#9f7aea]"
              />
              <button className="mt-3 w-full bg-gradient-to-r from-[#9f7aea] to-[#6b46c1] text-white py-2 rounded-md font-bold hover:opacity-90 transition">
                Calculate
              </button>
            </div>
          )}
        </div>

        {/* Speedrun button */}
        <button className="bg-gradient-to-r from-[#805ad5] to-[#6b46c1] hover:from-[#9f7aea] hover:to-[#805ad5] text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest shadow-[0_0_10px_#805ad5aa] transition-all duration-300">
          Speedrun calc
        </button>
      </div>

      {/* Agents section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#9f7aea]">Agents</h2>
        <div className="flex gap-4 mb-6">
          {Array(9)
            .fill(0)
            .map((_, idx) => (
              <div
                key={`agent-${idx}`}
                className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center opacity-60 border border-[#805ad5] hover:opacity-100 hover:scale-105 transition-transform"
              >
                <span className="text-[#9f7aea]">🛡</span>
              </div>
            ))}
        </div>
        <button
          onClick={() => setAgentModalOpen(true)}
          className="bg-[#1a1a2e] border border-[#805ad5] text-[#9f7aea] px-4 py-2 rounded-full font-bold hover:bg-[#2d2b45] transition-all"
        >
          Manage agents
        </button>
        <AgentModal isOpen={isAgentModalOpen} onClose={() => setAgentModalOpen(false)} />
      </div>

      {/* Engines section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#9f7aea]">Engines</h2>
        <div className="flex gap-4 mb-6">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div
                key={`engine-${idx}`}
                className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center opacity-60 border border-[#805ad5] hover:opacity-100 hover:scale-105 transition-transform"
              >
                <span className="text-[#9f7aea]">⚙️</span>
              </div>
            ))}
        </div>
        <button className="bg-[#1a1a2e] border border-[#805ad5] text-[#9f7aea] px-4 py-2 rounded-full font-bold hover:bg-[#2d2b45] transition-all">
          Manage engines
        </button>
      </div>
    </div>
  );
};

export { ProfilePage };
