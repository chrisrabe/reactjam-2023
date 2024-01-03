import React from "react";
import { Stage } from "@pixi/react";
import Ship from "../../components/Ship";
import Bullets from "../../components/Bullets";
import Enemies from "../../components/Enemies";
import Controls from "../../components/Controls";
import HUD from "../../components/HUD";
import { GameState } from "../../logic/types.ts";

interface GameScreenProps {
  game: GameState;
  playerId?: string;
}

const GameScreen: React.FC<GameScreenProps> = ({ game, playerId }) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isHost = game.host === playerId;

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={{
          background: "18181B",
        }}
      >
        <Ship
          x={game.ship.position.x}
          y={game.ship.position.y}
          size={game.ship.size}
          rotation={game.ship.rotation}
          hasControls
        />
        <Bullets bullets={game.bullets} />
        <Enemies enemies={game.enemies} isHost={isHost} />
      </Stage>
      <Controls />
      <HUD score={game.score} />
    </>
  );
};

export default GameScreen;
