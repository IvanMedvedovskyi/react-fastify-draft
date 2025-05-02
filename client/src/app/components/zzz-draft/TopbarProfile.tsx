"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import { useUserStore } from "@/app/store";

const TopbarProfile = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { clearUser } = useUserStore();
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

  console.log(user)

  return (
    <div className="relative flex items-center gap-3 cursor-pointer select-none">
      <div className="flex flex-col items-end leading-tight">
        {user && (
          <>
            <span className="text-white font-bold text-sm">
              {user.username}
            </span>
            <span className="text-gray-400 text-xs">
              #{user.username}
            </span>
          </>
        )}
      </div>

      {user && user.avatar && (
        <div
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-500 hover:border-white transition"
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
          className="absolute right-0 top-12 bg-[#1f2937] p-2 rounded shadow-lg min-w-[100px] text-center z-50"
        >
          <button
            onClick={handleLogout}
            className="text-white text-sm hover:underline transition cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export { TopbarProfile };
