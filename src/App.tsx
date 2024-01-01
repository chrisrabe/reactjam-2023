import { useEffect, useState } from "react";
import { GameState } from "./logic/types.ts";
import { Stage } from "@pixi/react";

function App() {
  const [game, setGame] = useState<GameState>();
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
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        background: "18181B",
      }}
    />
  );
}

export default App;
