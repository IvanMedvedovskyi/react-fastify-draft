'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/app/store';
import api from '@/app/api/axios';

const TopbarProfile = () => {
  const { user, setUser, clearUser } = useUserStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await api.get('/logout');
      clearUser();
      router.replace('/');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/me');
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  console.log('USER STORE:', user);

  if (isLoading) {
    return (
      <div className="text-white text-sm">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-white text-sm">
        Not logged in
      </div>
    );
  }

  const avatarUrl = user.avatar && user.discordId
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}`
    : '/noProfPic.png';

  return (
    <div className="relative flex items-center gap-3 cursor-pointer select-none">
      <div className="flex flex-col items-end leading-tight">
        <span className="text-white font-bold text-sm">{user.username}</span>
        <span className="text-gray-400 text-xs">
          #{user.discordId?.slice(0, 4)}
        </span>
      </div>

      <div
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-500 hover:border-white transition"
        onClick={() => setOpen(prev => !prev)}
      >
        <img
          src={avatarUrl}
          alt="Avatar"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/noProfPic.png';
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {open && (
        <div className="absolute right-0 top-12 bg-[#1f2937] p-2 rounded shadow-lg min-w-[100px] text-center z-50">
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
