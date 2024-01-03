import React from "react";
import { GameState, PlayerRole } from "../../logic/types.ts";
import RoleButton from "./RoleButton";
import { Players } from "rune-games-sdk";

interface LobbySceneProps {
  game: GameState;
  playerId: string;
  players: Players;
}

const roles = Object.values(PlayerRole);

const LobbyScene: React.FC<LobbySceneProps> = ({ game, playerId, players }) => {
  const getPlayerNamesWithRole = (role: PlayerRole) =>
    Object.values(game.players)
      .filter((p) => p.role === role)
      .map((p) => (p.id === playerId ? "You" : players[p.id].displayName));

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
      <h1 style={{ textTransform: "uppercase" }}>Phantom Radar</h1>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          gap: 25,
          marginTop: 25,
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
          />
        ))}
      </div>
    </div>
  );
};

export default LobbyScene;
