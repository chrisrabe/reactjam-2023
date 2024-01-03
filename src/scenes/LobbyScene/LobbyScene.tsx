import React from "react";
import { GameState, PlayerRole } from "../../logic/types.ts";
import RoleButton from "./RoleButton";

interface LobbySceneProps {
  game: GameState;
  playerId?: string;
}

const LobbyScene: React.FC<LobbySceneProps> = ({ game, playerId }) => {
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
      {playerId && (
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: 25,
            marginTop: 25,
          }}
        >
          <RoleButton
            role={PlayerRole.Pilot}
            isSelected={game.players[playerId].role === PlayerRole.Pilot}
          />
          <RoleButton
            role={PlayerRole.Overwatch}
            isSelected={game.players[playerId].role === PlayerRole.Overwatch}
          />
        </div>
      )}
    </div>
  );
};

export default LobbyScene;
