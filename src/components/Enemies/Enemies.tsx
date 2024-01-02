import React from "react";
import useEnemySpawner from "../../hooks/useEnemySpawner.ts";
import { Enemy } from "../../logic/types.ts";
import { Container } from "@pixi/react";
import EnemyGraphics from "./EnemyGraphics.tsx";

interface EnemiesProps {
  enemies: Enemy[];
  isHost: boolean;
}

const Enemies: React.FC<EnemiesProps> = ({ enemies, isHost }) => {
  useEnemySpawner({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isHost,
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
