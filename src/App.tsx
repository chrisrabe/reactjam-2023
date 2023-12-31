import React, { useEffect, useState } from "react"
import { GameState } from "./logic.ts"
import {Container,Stage} from "@pixi/react";
import {APPLICATION_OPTIONS} from "./config/pixi-config.ts";
import World from "./components/common/World";
import Shape from "./components/common/Shape";
import Players from "./components/game/Players";
import Controls from "./components/game/Controls";

function App() {
  const [game, setGame] = useState<GameState>()
  const width = window.innerWidth
  const height = window.innerHeight

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
    <>
      <Stage width={width} height={height} options={APPLICATION_OPTIONS}>
        <World>
          <Container name="bounds">
            <Shape
              key="bottom"
              type="rectangle"
              config={{ x: width / 2, y: height + 50, width, height: 100 }}
              options={{ isStatic: true }}
            />
            <Shape
              key="top"
              type="rectangle"
              config={{ x: width / 2, y: -50, width, height: 100 }}
              options={{ isStatic: true }}
            />
            <Shape
              key="left"
              type="rectangle"
              config={{ x: -50, y: height/2, width: 100, height }}
              options={{ isStatic: true }}
            />
            <Shape
              key="right"
              type="rectangle"
              config={{ x: width + 50, y: height/2, width: 100, height }}
              options={{ isStatic: true }}
            />
          </Container>
          <Players />
        </World>
      </Stage>
      <Controls />
    </>
  )
}

export default App
