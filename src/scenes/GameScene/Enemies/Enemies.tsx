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

const getVisibleEnemies = (
  enemies: Record<string, Enemy>,
): Record<string, Enemy> => {
  return Object.values(enemies).reduce<Record<string, Enemy>>((a, enemy) => {
    if (enemy.isVisible) {
      a[enemy.id] = enemy;
    }
    return a;
  }, {});
};

const checkIfKilledEnemies = (
  prevEnemies: Record<string, Enemy>,
  enemies: Record<string, Enemy>,
) => {
  for (const enemyId of Object.keys(enemies)) {
    if (prevEnemies[enemyId]) {
      delete prevEnemies[enemyId];
    }
  }
  return Object.keys(prevEnemies).length > 0;
};

const checkHasNewVisibleEnemies = (
  prevVisibleEnemies: Record<string, Enemy>,
  enemies: Record<string, Enemy>,
) => {
  const curVisibleEnemies = getVisibleEnemies(enemies);
  for (const id of Object.keys(prevVisibleEnemies)) {
    if (curVisibleEnemies[id]) {
      delete curVisibleEnemies[id];
    }
  }
  return Object.keys(curVisibleEnemies).length > 0;
};

const Enemies: React.FC<EnemiesProps> = ({
  width,
  height,
  enemies,
  hasSpawner,
  scaleContext,
}) => {
  const prevVisibleEnemiesRef = useRef<Record<string, Enemy>>(
    getVisibleEnemies(enemies),
  );
  const prevEnemiesRef = useRef<Record<string, Enemy>>(enemies);

  useEnemySpawner({
    screenWidth: width,
    screenHeight: height,
    isEnabled: hasSpawner,
    scaleContext,
  });

  const { gameToClient } = scaleContext;
  const hasKilledEnemy = checkIfKilledEnemies(
    { ...prevEnemiesRef.current },
    enemies,
  );

  const hasNewVisibleEnemies = checkHasNewVisibleEnemies(
    prevVisibleEnemiesRef.current,
    enemies,
  );

  // Update references
  prevEnemiesRef.current = enemies;
  prevVisibleEnemiesRef.current = getVisibleEnemies(enemies);

  // SFX
  if (hasKilledEnemy) {
    playSound("explosion", { once: true });
  }
  if (hasNewVisibleEnemies) {
    playSound("ping", { once: true });
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
