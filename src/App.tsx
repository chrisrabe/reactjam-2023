import { useEffect, useRef, useState } from "react";
import { GameActions, GameState } from "./logic/types.ts";
import { Stage } from "@pixi/react";
import ShipGraphics from "./components/Ship";
import Controls from "./components/Controls";
import { GAME_STATE_CHANGED } from "./utils/events.ts";
import { OnChange } from "rune-games-sdk";
import useRuneClient from "./hooks/useRuneClient.ts";

function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [game, setGame] = useState<GameState>();
  const rotationInterpolator = useRef(Rune.interpolator<number>());
  useRuneClient();

  useEffect(() => {
    document.addEventListener(GAME_STATE_CHANGED, (event) => {
      console.log(event);
      const e = event as CustomEvent;
      const params = e.detail;
      const { game, futureGame } = params;

      rotationInterpolator.current.update({
        game: game.ship.rotation,
        futureGame: futureGame?.desiredRotation
          ? futureGame.desiredRotation
          : game.ship.rotation,
      });

      setGame(game);
    });
  }, []);

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
        <ShipGraphics
          x={game.ship.position.x}
          y={game.ship.position.y}
          size={game.ship.size}
          rotation={rotationInterpolator.current.getPosition()}
          hasControls
        />
      </Stage>
      <Controls />
    </>
  );
}

export default App;
