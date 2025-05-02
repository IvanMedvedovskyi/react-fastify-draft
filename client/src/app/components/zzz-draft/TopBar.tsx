"use client";

import React from "react";
import { TopbarProfile } from "./TopbarProfile";
import { useUserStore } from "@/app/store";

const TopBar = () => {
  const user = useUserStore((state) => state.user);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`;
  };

  return (
    <div className="flex items-center justify-between bg-[#111111] p-5">
      <h1 className="text-2xl font-extrabold text-lime-400 tracking-wider">
        ZZZ Draft
      </h1>
      {user ? (
        <TopbarProfile />
      ) : (
        <button
          onClick={handleLogin}
          className="text-left p-2 rounded bg-lime-400 text-black font-bold hover:brightness-110 transition cursor-pointer"
        >
          🔐 Login / Register
        </button>
      )}
    </div>
  );
};

export { TopBar };
