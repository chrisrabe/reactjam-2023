import { Vector2D } from "../logic/types.ts";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";

const SPAWN_INTERVAL = 1000; // ms

interface EnemySpawnerProps {
  screenWidth: number;
  screenHeight: number;
  isHost: boolean;
}

const useEnemySpawner = ({
  screenWidth,
  screenHeight,
  isHost,
}: EnemySpawnerProps) => {
  const lastEnemySpawnTime = useRef<number>();
  const intervalRef = useRef<NodeJS.Timeout>();

  const spawnEnemy = (): void => {
    const now = Date.now();

    if (
      lastEnemySpawnTime.current !== undefined &&
      now - lastEnemySpawnTime.current < SPAWN_INTERVAL
    ) {
      return;
    }

    lastEnemySpawnTime.current = now;

    let position: Vector2D;
    const edge = Math.floor(Math.random() * 4);

    switch (edge) {
      case 1: // Right edge
        position = { x: screenWidth, y: Math.random() * screenHeight };
        break;
      case 2: // Bottom edge
        position = { x: Math.random() * screenWidth, y: screenHeight };
        break;
      case 3: // Left edge
        position = { x: 0, y: Math.random() * screenHeight };
        break;
      default: // Top edge
        position = { x: Math.random() * screenWidth, y: 0 };
    }

    const enemy = {
      id: nanoid(),
      position,
    };

    Rune.actions.spawnEnemy(enemy);
  };

  useEffect(() => {
    if (isHost) {
      intervalRef.current = setInterval(() => spawnEnemy(), SPAWN_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHost]);
};

export default useEnemySpawner;
