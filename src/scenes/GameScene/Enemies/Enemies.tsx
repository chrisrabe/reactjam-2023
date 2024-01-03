import React from "react";
import useEnemySpawner from "../../../hooks/useEnemySpawner.ts";
import { Enemy } from "../../../logic/types.ts";
import { Container } from "@pixi/react";
import EnemyGraphics from "./EnemyGraphics.tsx";

interface EnemiesProps {
  enemies: Record<string, Enemy>;
}

const Enemies: React.FC<EnemiesProps> = ({ enemies }) => {
  useEnemySpawner({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isEnabled: true, // only overwatch display enemies, no need to account for host
  });

  return (
    <Container name="enemies">
      {Object.values(enemies).map((enemy) => (
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
