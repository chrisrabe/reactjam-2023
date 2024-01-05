import React from "react";
import { Stage } from "@pixi/react";
import Ship from "./Ship";
import Bullets from "./Bullets";
import Enemies from "./Enemies";
import HUD from "./HUD";
import { GameState, PlayerRole } from "../../logic/types.ts";
import OverwatchMarker from "./OverwatchMarker";
import Joystick from "./Joystick";
import RoleBG from "../../common/RoleBG";
import { ScaleContextValue } from "../../common/ScaleProvider/ScaleProvider.tsx";

interface GameScreenProps {
  game: GameState;
  playerId?: string;
  scaleContextValue: ScaleContextValue;
}

const GameScene: React.FC<GameScreenProps> = ({
  game,
  playerId,
  scaleContextValue,
}) => {
  const { gameToClient } = scaleContextValue;

  const width = game.dimensions.width * gameToClient.width;
  const height = game.dimensions.height * gameToClient.height;

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
        <RoleBG width={width} height={height} playerRole={playerRole} />
        {playerRole === PlayerRole.Pilot && (
          <Joystick scale={gameToClient.width} />
        )}
        <Ship
          x={game.ship.position.x * gameToClient.width}
          y={game.ship.position.y * gameToClient.height}
          size={game.ship.size * gameToClient.width}
          rotation={game.ship.rotation}
          hasTurret={playerRole !== PlayerRole.Overwatch}
        />
        {playerRole === PlayerRole.Overwatch && (
          <OverwatchMarker
            role={playerRole}
            marker={game.overwatchMarker}
            scaleContext={scaleContextValue}
          />
        )}
        {playerRole !== PlayerRole.Overwatch && (
          <Bullets bullets={game.bullets} scaleContext={gameToClient} />
        )}
        <Enemies
          enemies={game.enemies}
          hasSpawner={playerRole !== PlayerRole.Pilot}
          width={width}
          height={height}
          scaleContext={scaleContextValue}
        />
      </Stage>
      <HUD score={game.score} />
    </>
  );
};

export default GameScene;
