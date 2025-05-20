
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  points: number;
  gamesPlayed: number;
  highestCombo: number;
  activeTab: string;
  addPoints: (amount: number) => void;
  resetPoints: () => void;
  incrementGamesPlayed: () => void;
  updateHighestCombo: (combo: number) => void;
  setActiveTab: (tab: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      points: 0,
      gamesPlayed: 0,
      highestCombo: 0,
      activeTab: "game", // Default tab is game

      addPoints: (amount) => set((state) => ({
        points: state.points + amount
      })),

      resetPoints: () => set((state) => ({
        points: 0 // Actually reset points to 0
      })),

      incrementGamesPlayed: () => set((state) => ({
        gamesPlayed: state.gamesPlayed + 1
      })),

      updateHighestCombo: (combo) => set((state) => ({
        highestCombo: combo > state.highestCombo ? combo : state.highestCombo
      })),

      setActiveTab: (tab) => set({
        activeTab: tab
      }),
    }),
    {
      name: 'ton-tapper-storage',
    }
  )
);
