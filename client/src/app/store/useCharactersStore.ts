import { create } from 'zustand';

export interface Character {
    id: string,
    code: string,
    rank: 0,
    type: 0,
    element: 0,
    camp: 0,
    en: string,
    ru: string,
    portrait: string,
    ico: string,
    halfPortrait: string,
    halfPortrait170: string,
    iconHoyo: string,
    _id: string
}

interface CharactersState {
    characters: Character | null;
    setCharacters: (user: Character) => void;
    clearCharacters: () => void;
}

export const useCharactersStore = create<CharactersState>((set) => ({
    characters: null,
    setCharacters: (characters) => set({ characters }),
    clearCharacters: () => set({  characters: null }),
}));