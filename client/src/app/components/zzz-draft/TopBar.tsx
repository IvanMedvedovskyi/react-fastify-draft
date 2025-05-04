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
    <div className="flex items-center justify-between bg-[#1a1529] p-4 px-6 shadow-md border-b border-[#2e2546]">
      <h1 className="text-4xl font-bold text-[#c3baff] tracking-wider uppercase font-orbitron">
        <i className="pl-5">ZZZ Draft</i>
      </h1>

      {user ? (
        <TopbarProfile />
      ) : (
        <button
          onClick={handleLogin}
          className="relative px-4 py-2 rounded-lg bg-[#2e2546] hover:bg-[#3b2f5a] text-[#e0d4ff] font-medium font-orbitron uppercase tracking-wider transition-colors duration-300 border border-[#443464]"
        >
          <span className="flex items-center gap-2">
            <LogIn size={18} className="text-[#b19eff]" />
            Login / Register
          </span>
        </button>
      )}
    </div>
  );
};

export { TopBar };
