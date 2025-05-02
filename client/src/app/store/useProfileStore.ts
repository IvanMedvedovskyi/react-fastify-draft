import { create } from 'zustand';

interface DiscordUser {
  id: string;
  discordId: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
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