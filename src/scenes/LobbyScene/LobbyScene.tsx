import React, { useEffect, useMemo } from "react";
import { GameState, PlayerRole } from "../../logic/types.ts";
import RoleButton from "./RoleButton";
import { Players } from "rune-games-sdk";

interface LobbySceneProps {
  game: GameState;
  playerId?: string;
  players: Players;
}

const LobbyScene: React.FC<LobbySceneProps> = ({ game, playerId, players }) => {
  const { pilotNames, overwatchNames } = useMemo(() => {
    const pilotNames: string[] = [];
    const overwatchNames: string[] = [];

    for (const player of Object.values(game.players)) {
      const bucket =
        player.role === PlayerRole.Pilot ? pilotNames : overwatchNames;
      const name =
        player.id === playerId ? "You" : players[player.id].displayName;
      bucket.push(name);
    }

    return {
      pilotNames,
      overwatchNames,
    };
  }, [game.players, playerId, players]);

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
            playerNames={pilotNames}
          />
          <RoleButton
            role={PlayerRole.Overwatch}
            isSelected={game.players[playerId].role === PlayerRole.Overwatch}
            playerNames={overwatchNames}
          />
        </div>
      )}
    </div>
  );
};

export default LobbyScene;
