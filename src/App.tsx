import React, { useEffect, useState } from "react"
import { GameState } from "./logic.ts"
import {Container, Stage} from "@pixi/react";
import {APPLICATION_OPTIONS} from "./config/pixi-config.ts";
import World from "./components/common/World";
import Shape from "./components/common/Shape";

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
          <Shape
            type="circle"
            fillStyle={['yellow', 0.5]}
            config={{ x: 0, y: 20, radius: 20 + Math.random() * 100 }}
            options={{
              friction: 0.8,
              density: 0.00001,
              restitution: 0.4,
              stiffness: 1
            }}
          />
        </React.Fragment>
      </World>
    </Stage>
  )
}

export default App
