import React, { useRef } from "react";
import useEnemySpawner from "../../../hooks/useEnemySpawner.ts";
import { Enemy } from "../../../logic/types.ts";
import { Container } from "@pixi/react";
import EnemyGraphics from "./EnemyGraphics.tsx";
import { playSound } from "../../../sounds.ts";

interface EnemiesProps {
  enemies: Record<string, Enemy>;
  hasSpawner: boolean;
}

const Enemies: React.FC<EnemiesProps> = ({ enemies, hasSpawner }) => {
  const prevEnemiesRef = useRef<Record<string, Enemy>>(enemies);

  useEnemySpawner({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isEnabled: hasSpawner,
  });

  const prevEnemies = { ...prevEnemiesRef.current };

  for (const enemyId of Object.keys(enemies)) {
    if (prevEnemies[enemyId]) {
      delete prevEnemies[enemyId];
    }
  }
  const hasKilledEnemy = Object.keys(prevEnemies).length > 0;
  prevEnemiesRef.current = enemies;

  if (hasKilledEnemy) {
    playSound("explosion", { once: true });
  }

  return (
    <Container name="enemies">
      {Object.values(enemies)
        .filter((enemy) => enemy.isVisible || hasSpawner)
        .map((enemy) => (
          <EnemyGraphics
            key={enemy.id}
            x={enemy.position[0]}
            y={enemy.position[1]}
            size={enemy.size}
            showPilot={!hasSpawner} // overwatch can't see pilot
          />
        ))}
    </Container>
  );
};

export default Enemies;
