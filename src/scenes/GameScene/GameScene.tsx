import React from "react";
import { Stage } from "@pixi/react";
import Ship from "./Ship";
import Bullets from "./Bullets";
import Enemies from "./Enemies";
import HUD from "./HUD";
import { GameState, PlayerRole } from "../../logic/types.ts";
import OverwatchMarker from "./OverwatchMarker";
import Joystick from "./Joystick";
import RadarBG from "./RadarBG";

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
        <RadarBG width={width} height={height} />
        {playerRole === PlayerRole.Pilot && <Joystick />}
        <Ship
          x={game.ship.position.x}
          y={game.ship.position.y}
          size={game.ship.size}
          rotation={game.ship.rotation}
          hasTurret={playerRole !== PlayerRole.Overwatch}
        />
        <OverwatchMarker role={playerRole} marker={game.overwatchMarker} />
        {playerRole !== PlayerRole.Overwatch && (
          <Bullets bullets={game.bullets} />
        )}
        <Enemies
          enemies={game.enemies}
          hasSpawner={playerRole !== PlayerRole.Pilot}
        />
      </Stage>
      <HUD score={game.score} />
    </>
  );
};

export default GameScene;
