"use client";

import React, { useState, useEffect } from "react";
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
  
    console.log(user);

  return (
    <div className="flex items-center gap-4">
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
                  setNameInput(user?.customName || "");
                }}
                className="text-red-400 hover:text-red-300"
              >
                ❌
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                {user?.customName || "Unknown"}
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
    </div>
  );
};

export {ProfileHeader};
