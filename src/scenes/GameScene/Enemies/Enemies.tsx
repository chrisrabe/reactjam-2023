import React from "react";
import useEnemySpawner from "../../../hooks/useEnemySpawner.ts";
import { Enemy } from "../../../logic/types.ts";
import { Container } from "@pixi/react";
import EnemyGraphics from "./EnemyGraphics.tsx";

interface EnemiesProps {
  enemies: Record<string, Enemy>;
  hasSpawner: boolean;
}

const Enemies: React.FC<EnemiesProps> = ({ enemies, hasSpawner }) => {
  useEnemySpawner({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isEnabled: false,
  });

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
          />
        ))}
    </Container>
  );
};

export default Enemies;
