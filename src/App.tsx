import { useEffect, useRef, useState } from "react";
import { GameStage, GameState } from "./logic/types.ts";
import useRuneClient from "./hooks/useRuneClient.ts";
import useGameStateListener, {
  ChangeParams,
} from "./hooks/useGameStateListener.ts";
import GameScene from "./scenes/GameScene";
import LobbyScene from "./scenes/LobbyScene";
import { Players } from "rune-games-sdk";
import { playSound } from "./sounds.ts";

function App() {
  const [playerId, setPlayerId] = useState<string>();
  const playersRef = useRef<Players>();
  const [game, setGame] = useState<GameState>();
  useRuneClient();

  const onGameStateChange = ({ game, yourPlayerId, players }: ChangeParams) => {
    playersRef.current = players;
    setGame(game);
    setPlayerId(yourPlayerId);
  };

  useGameStateListener({ onGameStateChange });

  useEffect(() => {
    const listener = () => {
      playSound("background", { loop: true });
    };

    playSound("background", { rethrow: true, loop: true }).catch(() => {
      document.addEventListener("click", listener);
    });

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  if (!game || !playerId || !playersRef.current) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {(game.stage === GameStage.Preparing ||
        game.stage === GameStage.Starting) && (
        <LobbyScene
          game={game}
          playerId={playerId}
          players={playersRef.current}
        />
      )}
      {(game.stage === GameStage.Playing ||
        game.stage === GameStage.GameOver) && (
        <GameScene game={game} playerId={playerId} />
      )}
    </>
  );
}

export default App;
