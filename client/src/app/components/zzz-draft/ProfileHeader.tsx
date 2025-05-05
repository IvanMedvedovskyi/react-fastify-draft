"use client";

import React, { useState } from "react";
import { DiscordUser, useUserStore } from "@/app/store";
import api from "@/app/api/axios";
import { Pencil, Check, X } from "lucide-react";

const ProfileHeader = () => {
  const { user, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.customName || "");

  const avatarUrl =
    user?.avatar && user?.discordId
      ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${
          user?.avatar.startsWith("a_") ? "gif" : "png"
        }`
      : "/noProfPic.png";

  const handleSave = async (userId?: string, customName?: string) => {
    try {
      await api.put("/updateProfile", { userId, customName });
      const { data } = await api.get("/profile");
      const updatedUser: DiscordUser = {
        ...user,
        ...data.user,
      };
      setUser(updatedUser);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#1a132d] border border-[#241b35] rounded-xl p-5 flex gap-6 items-center shadow-[0_0_15px_#9f7aea33] relative">
      {/* Glow line */}
      <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-[#bb9eff33] via-[#9f7aea] to-[#bb9eff33] rounded-r-sm" />

      {/* Avatar */}
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Profile"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/noProfPic.png";
          }}
          className="w-20 h-20 rounded-md object-cover border border-[#2b2d31] shadow-[0_0_10px_#bb9eff55]"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="bg-[#261d3f] border border-[#9f7aea] px-2 py-1 rounded text-white text-sm w-44 focus:outline-none shadow-[0_0_6px_#9f7aea55]"
              />
              <button
                onClick={() => handleSave(user?.id, nameInput)}
                className="text-[#bb9eff] hover:text-white transition-colors duration-200 p-1"
              >
                <Check size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNameInput(user?.customName || "");
                }}
                className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-white">
                {user?.customName || "Unknown"}
              </h1>
              <button
                onClick={() => setIsEditing(true)}
                className="text-[#bb9eff] hover:text-white transition-colors duration-200 p-1"
              >
                <Pencil size={16} strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        <div className="text-[#9f87e8] text-xs tracking-wide">
          Discord ID:{" "}
          <span className="text-[#d8c4ff] font-mono">
            {user?.username ? `#${user.username}` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProfileHeader };
