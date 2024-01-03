import { useState } from "react";
import { GameState } from "./logic/types.ts";
import useRuneClient from "./hooks/useRuneClient.ts";
import useGameStateListener, {
  ChangeParams,
} from "./hooks/useGameStateListener.ts";
import GameScreen from "./screens/GameScreen";

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
      <GameScreen game={game} playerId={playerId} />
    </>
  );
}

export default App;
