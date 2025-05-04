import { create } from 'zustand';

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
    _id: string;
}

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
