"use client";

import React, { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";


const ProfilePage = () => {
  

  return (
    <div className="min-h-screen w-full bg-black text-white p-8">
      <ProfileHeader />

      {/* Остальной контент */}
    </div>
  );
};

export { ProfilePage };
