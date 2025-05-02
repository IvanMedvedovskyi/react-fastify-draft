"use client"

import { useUserStore } from '@/app/store';
import React, { useEffect, useState } from 'react'
import { TopbarProfile } from './TopbarProfile';

const TopBar = () => {
  const { user } = useUserStore();

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`;
  }

  return (
    <div className='flex items-center justify-between bg-black p-5'>
      <h1 className="text-2xl font-extrabold text-lime-400 tracking-wider">ZZZ Draft</h1>
      {user ? (
        <TopbarProfile />
      ) : (
        <button onClick={handleLogin} className="text-left p-2 rounded bg-lime-400 text-black font-bold hover:brightness-110 transition cursor-pointer">🔐 Login / Register</button>
      )}

    </div>
  )
}

export { TopBar }
