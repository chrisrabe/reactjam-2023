import type { RuneClient } from "rune-games-sdk";

export enum GameStage {
  Preparing = "preparing",
  Starting = "starting",
  Playing = "playing",
  GameOver = "gameover",
}

export interface GameState {
  score: number;
  host: string;
  stage: GameStage;
  players: Record<string, Player>;
  desiredRotation: number | null;
  overwatchMarker: OverwatchMarker | null;
  newBullets: Bullet[];
  ship: ShipState;
  bullets: Record<string, Bullet>;
  enemies: Record<string, Enemy>;
}

export type GameActions = {
  setRotation: (rotation: number) => void;
  shoot: (id: string) => void;
  spawnEnemy: (params: { position: Vector2D; id: string }) => void;
  setRole: (role: PlayerRole) => void;
  setOverwatchMarker: (marker: OverwatchMarker) => void;
  toggleReady: () => void;
  setStage: (stage: GameStage) => void;
};

interface ShipState {
  position: Vector2D;
  rotation: number;
  size: number;
}

export interface OverwatchMarker {
  position: Vector2D;
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
  isVisible: boolean;
}

export enum PlayerRole {
  Pilot = "pilot",
  Overwatch = "overwatch",
  Spectator = "spectator",
}

export interface Player {
  id: string;
  role: PlayerRole;
  isReady: boolean;
}

export interface Vector2D {
  x: number;
  y: number;
}

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}
