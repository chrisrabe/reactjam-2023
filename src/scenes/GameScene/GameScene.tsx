import React from "react";
import { Stage } from "@pixi/react";
import Ship from "./Ship";
import Bullets from "./Bullets";
import Enemies from "./Enemies";
import Controls from "./Controls";
import HUD from "./HUD";
import { GameState, PlayerRole } from "../../logic/types.ts";
import OverwatchMarker from "./OverwatchMarker";

interface GameScreenProps {
  game: GameState;
  playerId?: string;
}

const GameScene: React.FC<GameScreenProps> = ({ game, playerId }) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const playerRole = playerId
    ? game.players[playerId].role
    : PlayerRole.Spectator;

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
          role={playerRole}
        />
        <OverwatchMarker role={playerRole} marker={game.overwatchMarker} />
        {playerRole !== PlayerRole.Overwatch && (
          <Bullets bullets={game.bullets} />
        )}
        {playerRole !== PlayerRole.Pilot && <Enemies enemies={game.enemies} />}
      </Stage>
      <Controls rotationDisabled={playerRole === PlayerRole.Overwatch} />
      <HUD score={game.score} />
    </>
  );
};

export default GameScene;
