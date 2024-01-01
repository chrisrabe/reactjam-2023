import { useEffect, useState } from "react";
import { GameState } from "./logic/types.ts";
import { Stage } from "@pixi/react";
import ShipGraphics from "./components/Ship";

const SHIP_SIZE = 50;

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
    <Stage
      width={width}
      height={height}
      options={{
        background: "18181B",
      }}
    >
      <ShipGraphics
        x={width / 2}
        y={height / 2 - SHIP_SIZE / 2}
        size={SHIP_SIZE}
        rotation={0}
      />
    </Stage>
  );
}

export default App;
