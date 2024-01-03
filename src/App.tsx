import { useState } from "react";
import { GameStage, GameState } from "./logic/types.ts";
import useRuneClient from "./hooks/useRuneClient.ts";
import useGameStateListener, {
  ChangeParams,
} from "./hooks/useGameStateListener.ts";
import GameScene from "./scenes/GameScene";
import LobbyScene from "./scenes/LobbyScene";

function App() {
  const [playerId, setPlayerId] = useState<string>();
  const [game, setGame] = useState<GameState>();
  useRuneClient();

  const onGameStateChange = ({ game, yourPlayerId }: ChangeParams) => {
    setGame(game);
    setPlayerId(yourPlayerId);
  };

  useGameStateListener({ onGameStateChange });

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {game.stage === GameStage.Preparing && (
        <LobbyScene game={game} playerId={playerId} />
      )}
      {game.stage === GameStage.Playing && (
        <GameScene game={game} playerId={playerId} />
      )}
    </>
  );
}

export default App;
