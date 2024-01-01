import type { RuneClient } from "rune-games-sdk";

export interface GameState {
  count: number;
}

type GameActions = {
  increment: (params: { amount: number }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}
