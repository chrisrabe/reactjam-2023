import { Vector2D } from "../logic/types.ts";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";

const SPAWN_INTERVAL = 2000; // ms

interface EnemySpawnerProps {
  screenWidth: number;
  screenHeight: number;
  isEnabled: boolean;
}

const useEnemySpawner = ({
  screenWidth,
  screenHeight,
  isEnabled,
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
    const edge = Math.floor(Math.random() * 2); // Randomly select between 0 (top) and 1 (bottom)

    if (edge === 0) {
      // Top edge
      position = { x: Math.floor(Math.random() * screenWidth), y: 0 };
    } else {
      // Bottom edge
      position = {
        x: Math.floor(Math.random() * screenWidth),
        y: screenHeight,
      };
    }

    const enemy = {
      id: nanoid(),
      position,
    };

    Rune.actions.spawnEnemy(enemy);
  };

  useEffect(() => {
    if (isEnabled) {
      intervalRef.current = setInterval(() => spawnEnemy(), SPAWN_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isEnabled]);
};

export default useEnemySpawner;
