import React from 'react'

const TopBar = () => {
  return (
    <div className='flex items-center justify-between bg-black p-5'>
      <h1 className="text-2xl font-extrabold text-lime-400 tracking-wider">ZZZ Draft</h1>
      <button className="text-left p-2 rounded bg-lime-400 text-black font-bold hover:brightness-110 transition">🔐 Login / Register</button>
    </div>
  )
}

export { TopBar }
