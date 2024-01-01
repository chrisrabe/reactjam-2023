import { useEffect, useState } from "react";
import { GameState } from "./logic";

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

  return <div>Hello world</div>;
}

export default App;
