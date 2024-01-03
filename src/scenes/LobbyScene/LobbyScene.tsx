import React from "react";
import { GameStage, GameState, PlayerRole } from "../../logic/types.ts";
import RoleButton from "./RoleButton";
import { Players } from "rune-games-sdk";
import ReadyButton from "./ReadyButton";

interface LobbySceneProps {
  game: GameState;
  playerId: string;
  players: Players;
}

const roles = Object.values(PlayerRole).filter(
  // TODO: Add Spectator support in future.
  (role) => role != PlayerRole.Spectator,
);

const roleColors: Record<PlayerRole, string> = {
  overwatch: "#C084FC",
  pilot: "#A3E635",
  spectator: "#38BDF8",
};

const LobbyScene: React.FC<LobbySceneProps> = ({ game, playerId, players }) => {
  const getPlayerNamesWithRole = (role: PlayerRole) =>
    Object.values(game.players)
      .filter((p) => p.role === role)
      .map((p) => (p.id === playerId ? "You" : players[p.id].displayName));

  const playerRoleColor = roleColors[game.players[playerId].role];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: window.innerHeight,
      }}
    >
      <img
        src="/assets/logo.svg"
        alt="Phantom Radar Logo"
        style={{ marginTop: 25 }}
      />
      <h1
        style={{
          textTransform: "uppercase",
          color: playerRoleColor,
        }}
      >
        Phantom Radar
      </h1>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          gap: 25,
          marginTop: 25,
          marginBottom: 50,
        }}
      >
        {roles.map((role) => (
          <RoleButton
            key={role}
            role={role}
            isSelected={game.players[playerId].role === role}
            playerNames={getPlayerNamesWithRole(role)}
            onClick={() => {
              Rune.actions.setRole(role);
            }}
            color={roleColors[role]}
            disabled={game.stage === GameStage.Starting}
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
      />
    </div>
  );
};

export default LobbyScene;
