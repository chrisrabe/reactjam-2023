import React, { useEffect, useState } from "react"
import { GameState } from "./logic.ts"
import {Container, Stage} from "@pixi/react";
import {APPLICATION_OPTIONS} from "./config/pixi-config.ts";
import World from "./components/common/World";
import Shape from "./components/common/Shape";
import Kayak from "./components/game/Kayak";

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
    <Stage width={width} height={height} options={APPLICATION_OPTIONS}>
      <World>
        <React.Fragment>
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
          <Kayak x={window.innerWidth / 2} y={window.innerHeight / 2} width={25} height={50}/>
        </React.Fragment>
      </World>
    </Stage>
  )
}

export default App
