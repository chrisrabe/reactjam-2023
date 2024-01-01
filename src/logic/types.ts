import type { RuneClient } from "rune-games-sdk";

export interface GameState {
  count: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

type GameActions = {
  increment: (params: { amount: number }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}
