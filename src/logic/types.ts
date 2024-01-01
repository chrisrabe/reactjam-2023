import type { RuneClient } from "rune-games-sdk";

export interface GameState {
  desiredRotation: number | null;
  ship: ShipState;
}

interface ShipState {
  position: Vector2D;
  rotation: number;
  size: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

export type GameActions = {
  rotate: (rotationSpeed: number) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}
