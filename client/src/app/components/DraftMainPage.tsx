"use client"

import React, { useEffect } from "react";
import { SidebarMenu, useSectionStore, useUserStore } from "../store";
import { DraftsPage, HomePage, ProfilePage, SideBar, TopBar, TournamentsPage, DraftSystemsPage } from "./zzz-draft";
import api from "../api/axios";
import { useSearchParams } from "next/navigation";

const DraftMainPage = () => {
  const { activeSection } = useSectionStore();
  const { setUser, user } = useUserStore();
  const searchParams = useSearchParams();

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile');
      setUser(data)
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
  };

  useEffect(() => {
    const authSuccess = searchParams.get('authSuccess');

    if (authSuccess === 'true') {
      fetchProfile();
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('User изменился:', user);
  }, [user]);

  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="flex">
        <SideBar />
        {activeSection === SidebarMenu.Home && (
          <HomePage />
        )}
        {activeSection === SidebarMenu.Profile && (
          <ProfilePage />
        )}
        {activeSection === SidebarMenu.Drafts && (
          <DraftsPage />
        )}
        {activeSection === SidebarMenu.Tournaments && (
          <TournamentsPage />
        )}
        {activeSection === SidebarMenu.DraftSystems && (
          <DraftSystemsPage />
        )}
      </div>
    </div>
  );
};

export { DraftMainPage };
