import { create } from "zustand";
import { Character } from "./useProfileStore";

interface CharactersState {
  characters: Character[];
  setCharacters: (users: Character[]) => void;
  clearCharacters: () => void;
}

export const useCharactersStore = create<CharactersState>((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
  clearCharacters: () => set({ characters: [] }),
}));
