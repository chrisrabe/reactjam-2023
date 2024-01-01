import { useEffect, useState } from "react";
import { GameState } from "./logic/types.ts";
import { Stage } from "@pixi/react";
import ShipGraphics from "./components/Ship";
import Controls from "./components/Controls";

const rotationInterpolator = Rune.interpolator<number>();

function App() {
  const [game, setGame] = useState<GameState>();
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    Rune.initClient({
      onChange: (params) => {
        const game = params.game;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const futureGame = params.futureGame!;

        rotationInterpolator.update({
          game: game.ship.rotation,
          futureGame: futureGame.ship.rotation,
        });

        setGame(params.game);
      },
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
          rotation={rotationInterpolator.getPosition()}
          hasControls
        />
      </Stage>
      <Controls />
    </>
  );
}

export default App;
