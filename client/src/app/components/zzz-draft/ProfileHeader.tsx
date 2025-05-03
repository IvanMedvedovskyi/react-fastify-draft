"use client";

import React, { useState } from "react";
import { DiscordUser, useUserStore } from "@/app/store";
import api from "@/app/api/axios";

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
    }
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-2xl bg-[#1a1c1f] border border-[#2e3238] rounded-xl p-5 flex gap-6 items-center shadow-[0_0_12px_-2px_#0ff2ff22] relative">
      {/* Декоративная линия слева */}
      <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-500/30 via-cyan-400 to-cyan-500/30 rounded-r-sm"></div>

      {/* Аватар */}
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Profile"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/noProfPic.png";
          }}
          className="w-20 h-20 rounded-md object-cover border border-[#2b2d31] shadow"
        />
      </div>

      {/* Имя + ID */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="bg-[#262a2f] border border-cyan-500 px-2 py-1 rounded text-white text-sm w-44"
              />
              <button
                onClick={() => handleSave(user?.id, nameInput)}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                ✅
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNameInput(user?.customName || "");
                }}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                ❌
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-white">
                {user?.customName || "Unknown"}
              </h1>
              <span
                className="text-gray-500 hover:text-cyan-400 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                ✏️
              </span>
            </>
          )}
        </div>

        <div className="text-gray-400 text-xs tracking-wide">
          Discord ID:{" "}
          <span className="text-cyan-300 font-mono">
            {user?.username ? `#${user.username}` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProfileHeader };
