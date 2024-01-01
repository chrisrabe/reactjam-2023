import { useEffect, useState } from "react";
import { GameState } from "./logic/types.ts";
import { Stage } from "@pixi/react";
import ShipGraphics from "./components/Ship";
import Controls from "./components/Controls";

function App() {
  const [game, setGame] = useState<GameState>();
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game);
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
          rotation={game.ship.rotation}
          hasControls
        />
      </Stage>
      <Controls />
    </>
  );
}

export default App;
