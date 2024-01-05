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
import useResize from "./hooks/useResize.ts";

function App() {
  const [playerId, setPlayerId] = useState<string>();
  const playersRef = useRef<Players>();
  const [game, setGame] = useState<GameState>();
  const { width, height } = useResize();

  useRuneClient();

  const onGameStateChange = ({ game, yourPlayerId, players }: ChangeParams) => {
    playersRef.current = players;
    setGame(game);
    setPlayerId(yourPlayerId);
  };

  useGameStateListener({ onGameStateChange });

  useEffect(() => {
    return; // disable sound

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

  const scaleWidth = width / game.dimensions.width;
  const scaleHeight = height / game.dimensions.height;

  console.log({
    width,
    height,
    scaleWidth,
    scaleHeight,
  });

  return (
    <>
      {(game.stage === GameStage.Preparing ||
        game.stage === GameStage.Starting) && (
        <LobbyScene
          game={game}
          playerId={playerId}
          players={playersRef.current}
          scaleWidth={scaleWidth}
          scaleHeight={scaleHeight}
        />
      )}
      {(game.stage === GameStage.Playing ||
        game.stage === GameStage.GameOver) && (
        <GameScene
          game={game}
          playerId={playerId}
          scaleWidth={scaleWidth}
          scaleHeight={scaleHeight}
        />
      )}
    </>
  );
}

export default App;
