import { create } from "zustand";

export interface Character {
  id: string;
  code: string;
  rank: number;
  type: number;
  element: number;
  camp: number;
  en: string;
  ru: string;
  portrait: string;
  icon: string;
  halfPortrait: string;
  halfPortrait170: string;
  iconHoyo: string;
  createdAt: string;
  mindscape: number;
}

export interface DiscordUser {
  id: string;
  discordId: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
  globalName: string;
  customName: string;
  characters: Character[];
}

interface UserState {
  user: DiscordUser | null;
  setUser: (user: DiscordUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
