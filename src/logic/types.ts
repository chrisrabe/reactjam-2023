import type { RuneClient } from "rune-games-sdk";

export interface GameState {
  desiredRotation: number | null;
  newBullets: Bullet[];
  ship: ShipState;
  bullets: Record<string, Bullet>;
  enemiesToSpawn: Enemy[];
  enemies: Enemy[];
}

export type GameActions = {
  rotate: (rotationSpeed: number) => void;
  shoot: (id: string) => void;
  spawnEnemy: (position: Vector2D) => void;
};

interface ShipState {
  position: Vector2D;
  rotation: number;
  size: number;
}

export interface Bullet {
  id: string;
  position: [number, number];
  rotation: number;
}

export interface Enemy {
  position: Vector2D;
}

export interface Vector2D {
  x: number;
  y: number;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}
