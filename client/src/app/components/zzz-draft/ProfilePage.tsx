"use client";

import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white p-8">
      <div className="flex items-center gap-4">
        <img
          src="/profile.jpg" // замени на реальную ссылку фото или статику
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Wint</h1>
          <span className="text-gray-400 cursor-pointer">✏️</span>
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-4">
        <div className="relative">
          <button className="bg-gray-800 rounded-full px-4 py-2 font-semibold text-gray-300 hover:bg-gray-700 transition">
            Search profile ⌄
          </button>
        </div>
        <div className="relative">
          <button className="bg-gray-800 rounded-full px-4 py-2 font-semibold text-gray-300 hover:bg-gray-700 transition">
            Calculate costs ⌄
          </button>
        </div>
        <button className="bg-gray-800 rounded-full px-4 py-2 font-semibold text-gray-300 hover:bg-gray-700 transition">
          Speedrun calc
        </button>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Agents</h2>
        <div className="flex gap-4 mb-6">
          {/* Иконки агентов */}
          {Array(9)
            .fill(0)
            .map((_, idx) => (
              <div
                key={`agent-${idx}`}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center opacity-50"
              >
                <span className="text-gray-400">🛡</span>
              </div>
            ))}
        </div>
        <button className="bg-gray-800 rounded-full px-4 py-2 font-semibold text-gray-300 hover:bg-gray-700 transition">
          Manage agents
        </button>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Engines</h2>
        <div className="flex gap-4 mb-6">
          {/* Иконки энжинов */}
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div
                key={`engine-${idx}`}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center opacity-50"
              >
                <span className="text-gray-400">⚙️</span>
              </div>
            ))}
        </div>
        <button className="bg-gray-800 rounded-full px-4 py-2 font-semibold text-gray-300 hover:bg-gray-700 transition">
          Manage engines
        </button>
      </div>
    </div>
  );
};

export {ProfilePage};
