import React from "react";
import { GameStage, GameState, PlayerRole } from "../../logic/types.ts";
import RoleButton from "./RoleButton";
import { Players } from "rune-games-sdk";
import ReadyButton from "./ReadyButton";
import { Stage } from "@pixi/react";
import { playSound } from "../../sounds.ts";
import Tutorial from "./Tutorial";
import RoleBG from "../../common/RoleBG";
import { ScaleContextValue } from "../../utils/scaleContext.tsx";
import logo from "../../assets/logo.svg";
import { roleColors } from "../../utils/role.ts";

interface LobbySceneProps {
  game: GameState;
  playerId: string;
  players: Players;
  scaleContextValue: ScaleContextValue;
}

const roles = Object.values(PlayerRole).filter(
  // TODO: Add Spectator support in future.
  (role) => role != PlayerRole.Spectator,
);

const LobbyScene: React.FC<LobbySceneProps> = ({
  game,
  playerId,
  players,
  scaleContextValue,
}) => {
  const { gameToClient } = scaleContextValue;

  const getPlayerNamesWithRole = (role: PlayerRole) =>
    Object.values(game.players)
      .filter((p) => p.role === role)
      .map((p) => (p.id === playerId ? "You" : players[p.id].displayName));

  const playerRole = game.players[playerId].role;
  const playerRoleColor = roleColors[game.players[playerId].role];

  const width = game.dimensions.width * gameToClient.width;
  const height = game.dimensions.height * gameToClient.height;

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
      </Stage>
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={logo}
          alt="Phantom Radar Logo"
          style={{
            marginTop: 25 * gameToClient.height,
            width: 100 * gameToClient.width,
            height: 100 * gameToClient.height,
          }}
        />
        <h1
          style={{
            textTransform: "uppercase",
            color: playerRoleColor,
            fontSize: 35 * gameToClient.width,
          }}
        >
          Phantom Radar
        </h1>
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: 25 * gameToClient.height,
            marginTop: 25 * gameToClient.height,
            marginBottom: 50 * gameToClient.height,
            transform: `scale(${gameToClient.width})`,
          }}
        >
          {roles.map((role) => (
            <RoleButton
              key={role}
              role={role}
              isSelected={game.players[playerId].role === role}
              playerNames={getPlayerNamesWithRole(role)}
              onClick={() => {
                playSound("beep", { once: true });
                Rune.actions.setRole(role);
              }}
              color={roleColors[role]}
              disabled={
                game.stage === GameStage.Starting ||
                game.stage === GameStage.Playing
              }
            />
          ))}
        </div>
        <ReadyButton
          stage={game.stage}
          color={playerRoleColor}
          isReady={game.players[playerId].isReady}
          numReady={Object.values(game.players).filter((p) => p.isReady).length}
          disabled={roles.some(
            (role) => getPlayerNamesWithRole(role).length === 0,
          )}
          scale={gameToClient.width}
        />
        <Tutorial
          role={playerRole}
          color={playerRoleColor}
          scale={gameToClient.width}
        />
      </div>
    </>
  );
};

export default LobbyScene;
