import { useRef, useState } from "react";
import { GameState } from "./logic/types.ts";
import { Stage } from "@pixi/react";
import Ship from "./components/Ship";
import Controls from "./components/Controls";
import useRuneClient from "./hooks/useRuneClient.ts";
import Bullets from "./components/Bullets";
import useGameStateListener, {
  ChangeParams,
} from "./hooks/useGameStateListener.ts";
import Enemies from "./components/Enemies";
import HUD from "./components/HUD";

function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [isHost, setIsHost] = useState(false);
  const [game, setGame] = useState<GameState>();
  const rotationInterpolator = useRef(Rune.interpolator<number>());
  useRuneClient();

  const onGameStateChange = ({
    game,
    futureGame,
    yourPlayerId,
  }: ChangeParams) => {
    rotationInterpolator.current.update({
      game: game.ship.rotation,
      futureGame: futureGame?.desiredRotation
        ? futureGame.desiredRotation
        : game.ship.rotation,
    });

    setGame(game);
    setIsHost(yourPlayerId === game.host);
  };

  useGameStateListener({ onGameStateChange });

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={{
          background: "18181B",
        }}
      >
        <Ship
          x={game.ship.position.x}
          y={game.ship.position.y}
          size={game.ship.size}
          rotation={rotationInterpolator.current.getPosition()}
          hasControls
        />
        <Bullets bullets={game.bullets} />
        <Enemies enemies={game.enemies} isHost={isHost} />
      </Stage>
      <Controls />
      <HUD score={game.score} />
    </>
  );
}

export default App;
