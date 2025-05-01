"use client"

import React from "react";
import { SidebarMenu, useSectionStore } from "../store";
import { DraftsPage, HomePage, ProfilePage, SideBar, TopBar, TournamentsPage, DraftSystemsPage } from "./zzz-draft";

const DraftMainPage = () => {
  const { activeSection } = useSectionStore()
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
