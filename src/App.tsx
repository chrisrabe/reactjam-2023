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

function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [game, setGame] = useState<GameState>();
  const rotationInterpolator = useRef(Rune.interpolator<number>());
  useRuneClient();

  const onGameStateChange = ({ game, futureGame }: ChangeParams) => {
    console.log(game);

    rotationInterpolator.current.update({
      game: game.ship.rotation,
      futureGame: futureGame?.desiredRotation
        ? futureGame.desiredRotation
        : game.ship.rotation,
    });

    setGame(game);
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
      </Stage>
      <Controls />
    </>
  );
}

export default App;
