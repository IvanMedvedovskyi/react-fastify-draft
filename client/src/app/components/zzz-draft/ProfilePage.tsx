"use client";

import React, { useState } from "react";
import { useUserStore } from "@/app/store";
import api from "@/app/api/axios";

const ProfilePage = () => {
  const { user, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.globalName || "");

  const avatarUrl =
    user?.avatar && user?.discordId
      ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${
          user?.avatar.startsWith("a_") ? "gif" : "png"
        }`
      : "/noProfPic.png";

  const handleSave = async (userId?: string, globalName?: string) => {
    try {
      const { data } = await api.put("/updateProfile", { userId, globalName });
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white p-8">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt="Profile"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/noProfPic.png";
          }}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="bg-gray-800 border border-cyan-400 px-2 py-1 rounded-md text-white"
              />
              <button
                onClick={() => handleSave(user?.id, nameInput)}
                className="text-cyan-400 hover:text-cyan-300"
              >
                ✅
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNameInput(user?.globalName || "");
                }}
                className="text-red-400 hover:text-red-300"
              >
                ❌
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                {user?.globalName || "Unknown"}
              </h1>
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                ✏️
              </span>
            </>
          )}
        </div>
      </div>

      <div className="text-gray-400 text-sm mt-2">
        Discord ID: {user?.username ? `#${user.username}` : "—"}
      </div>

      {/* Остальной контент */}
    </div>
  );
};

export { ProfilePage };
