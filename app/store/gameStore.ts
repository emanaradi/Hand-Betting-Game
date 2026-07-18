import { create } from "zustand";

import { GameEngine } from "~/lib/game/gameEngine";
import type { GameState } from "~/types/game";
import type { Gender } from "~/types/game";

interface GameStore {
  engine: GameEngine;

  gameState: GameState | null;
  startGame: (playerName: string, gender: Gender) => void;
  betHigher: () => void;
  betLower: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  engine: new GameEngine(),
  gameState: null,

  startGame: (playerName, gender) => {
    const newEngine = new GameEngine();

    newEngine.setPlayerInfo(playerName, gender);
    newEngine.start();

    set({ engine: newEngine, gameState: newEngine.getState() });
  },

  betHigher: () => {
    const engine = get().engine;

    engine.bet("higher");

    set({ gameState: engine.getState() });
  },

  betLower: () => {
    const engine = get().engine;

    engine.bet("lower");

    set({ gameState: engine.getState() });
  },

  resetGame: () => {
    const newEngine = new GameEngine();

    set({ engine: newEngine, gameState: null });
  },
}));
