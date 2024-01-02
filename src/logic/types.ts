import type { RuneClient } from "rune-games-sdk";

export enum GameStage {
  Playing = "playing",
  GameOver = "gameover",
}

export interface GameState {
  host: string;
  stage: GameStage;
  desiredRotation: number | null;
  newBullets: Bullet[];
  ship: ShipState;
  bullets: Record<string, Bullet>;
  enemies: Record<string, Enemy>;
}

export type GameActions = {
  rotate: (rotationSpeed: number) => void;
  shoot: (id: string) => void;
  spawnEnemy: (params: { position: Vector2D; id: string }) => void;
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
  size: number;
}

export interface Enemy {
  id: string;
  position: [number, number];
  size: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}
