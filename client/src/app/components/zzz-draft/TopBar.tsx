"use client";

import React from "react";
import { LogIn } from "lucide-react";
import { TopbarProfile } from "./TopbarProfile";
import { useUserStore } from "@/app/store";

const TopBar = () => {
  const user = useUserStore((state) => state.user);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`;
  };

  return (
    <div className="flex items-center justify-between bg-[#111111] p-5 relative z-10 shadow-lg">
      <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wider uppercase font-orbitron">
        ZZZ Draft
      </h1>
      {user ? (
        <TopbarProfile />
      ) : (
        <button
          onClick={handleLogin}
          className="cursor-pointer relative group px-4 py-3 rounded-xl w-fit bg-gradient-to-r from-cyan-500 to-blue-500 text-black transition-all duration-500 glow-border overflow-hidden"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,255,255,0.1)_0%,_transparent_70%)] blur-2xl opacity-40 group-hover:opacity-60 transition" />
          <span className="relative z-10 flex items-center gap-2 font-orbitron uppercase tracking-wide">
            <LogIn size={18} className="text-cyan-300" />
            Login / Register
          </span>
        </button>
      )}
    </div>
  );
};

export { TopBar };
