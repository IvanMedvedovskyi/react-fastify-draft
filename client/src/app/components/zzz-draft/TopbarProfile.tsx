"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import { useUserStore } from "@/app/store";
import { LogOut } from "lucide-react";

const TopbarProfile = () => {
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const openModal = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await api.get("/logout");
      clearUser();
      router.replace("/");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      openModal.current &&
      !openModal.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const avatarUrl =
    user?.avatar && user?.discordId
      ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${
          user?.avatar.startsWith("a_") ? "gif" : "png"
        }`
      : "/noProfPic.png";

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative flex items-center gap-3 select-none">
      <div className="flex flex-col items-end leading-tight font-orbitron">
        {user && (
          <>
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">
              {user.globalName}
            </span>
            <span className="text-gray-300 text-xs">#{user.username}</span>
          </>
        )}
      </div>

      {user && user.avatar && (
        <div
          className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-cyan-500 hover:border-cyan-400 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <img
            src={avatarUrl}
            alt="Avatar"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/noProfPic.png";
            }}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {open && (
        <div
          ref={openModal}
          className="absolute right-0 top-14 rounded-xl shadow-lg min-w-[150px] z-50 border border-cyan-400 backdrop-blur-xl"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm text-black bg-gradient-to-r from-cyan-500 to-blue-500 font-bold py-2 px-3 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 font-orbitron uppercase tracking-wide"
          >
            <LogOut size={16} className="text-cyan-300" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export { TopbarProfile };
