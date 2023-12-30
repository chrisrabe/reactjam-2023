import { useEffect, useState } from "react"
import { GameState } from "./logic.ts"
import {Stage} from "@pixi/react";
import {APPLICATION_OPTIONS} from "./config/pixi-config.ts";

function App() {
  const [game, setGame] = useState<GameState>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} options={APPLICATION_OPTIONS}></Stage>
  )
}

export default App
