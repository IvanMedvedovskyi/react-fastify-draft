import { create } from "zustand"

export enum SidebarMenu {
    Home = 'home',
    Profile = 'profile',
    Drafts = 'drafts',
    Tournaments = 'tournaments',
    DraftSystems = 'draft-systems',
}

interface SectionsStore {
    activeSection: SidebarMenu;
    setActiveSection: (activeSection: SidebarMenu) => void
}

export const useSectionStore = create<SectionsStore>((set) => ({
    activeSection: SidebarMenu.Home,
    setActiveSection: (activeSection) => set({ activeSection })
}))