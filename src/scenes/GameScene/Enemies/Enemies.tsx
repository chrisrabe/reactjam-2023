import React, { useRef } from "react";
import useEnemySpawner from "../../../hooks/useEnemySpawner.ts";
import { Enemy } from "../../../logic/types.ts";
import { Container } from "@pixi/react";
import EnemyGraphics from "./EnemyGraphics.tsx";
import { playSound } from "../../../sounds.ts";
import { ScaleContextValue } from "../../../utils/scaleContext.tsx";

interface EnemiesProps {
  width: number;
  height: number;
  enemies: Record<string, Enemy>;
  hasSpawner: boolean;
  scaleContext: ScaleContextValue;
}

const Enemies: React.FC<EnemiesProps> = ({
  width,
  height,
  enemies,
  hasSpawner,
  scaleContext,
}) => {
  const prevEnemiesRef = useRef<Record<string, Enemy>>(enemies);
  useEnemySpawner({
    screenWidth: width,
    screenHeight: height,
    isEnabled: hasSpawner,
    scaleContext,
  });

  const { gameToClient } = scaleContext;
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
            x={enemy.position[0] * gameToClient.width}
            y={enemy.position[1] * gameToClient.height}
            size={enemy.size * gameToClient.width}
            showPilot={!hasSpawner} // overwatch can't see pilot
          />
        ))}
    </Container>
  );
};

export default Enemies;
