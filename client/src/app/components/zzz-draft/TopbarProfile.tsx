"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store";

const TopbarProfile = () => {
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const openModal = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
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
            <span className="text-[#b794f4] font-semibold text-sm tracking-widest uppercase drop-shadow-[0_0_4px_#805ad5aa]">
              {user.customName}
            </span>
            <span className="text-gray-400 text-xs tracking-wide">
              #{user.username}
            </span>
          </>
        )}
      </div>

      {user && user.avatar && (
        <div
          className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#9f7aea] hover:border-[#b794f4] transition-all duration-300 ease-in-out cursor-pointer shadow-[0_0_10px_#9f7aea44]"
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
          className="absolute right-0 top-14 rounded-xl border border-[#9f7aea] bg-[#1b132c]/70 backdrop-blur-md shadow-2xl min-w-[160px] z-50 p-1"
        >
          <button
            onClick={handleLogout}
            className="w-full text-center text-sm text-white bg-gradient-to-r from-[#a78bfa] to-[#805ad5] hover:from-[#b794f4] hover:to-[#9f7aea] font-bold py-2 px-4 rounded-lg transition-all duration-300 font-orbitron uppercase tracking-wide shadow-[0_0_10px_#9f7aea44]"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export { TopbarProfile };
