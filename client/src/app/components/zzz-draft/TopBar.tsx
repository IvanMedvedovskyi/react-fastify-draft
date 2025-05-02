"use client"

import api from '@/app/api/axios';
import { useUserStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const TopBar = () => {
  const { user, clearUser } = useUserStore();
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`;
  }

  const handleLogout = async () => {
    try {
      await api.get('/logout');
      clearUser();
      router.replace("/")
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <div className='flex items-center justify-between bg-black p-5'>
      <h1 className="text-2xl font-extrabold text-lime-400 tracking-wider">ZZZ Draft</h1>
      {user ? (
        <button onClick={handleLogout} className="text-left p-2 rounded bg-lime-400 text-black font-bold hover:brightness-110 transition">Sign out</button>
      ) : (
        <button onClick={handleLogin} className="text-left p-2 rounded bg-lime-400 text-black font-bold hover:brightness-110 transition">🔐 Login / Register</button>
      )}

    </div>
  )
}

export { TopBar }
