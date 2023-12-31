import React, {useEffect, useRef} from "react";
import {useEngine} from "../../common/World";
import {Bodies, Body, Composite} from "matter-js";
import {Graphics as PixiGraphics} from "pixi.js";
import {Graphics, useTick} from "@pixi/react";
import Vector2D from "../../../types/Vector2D.ts";
import {CODE_S, CODE_W} from "keycode-js";

interface KayakProps {
  x: number
  y: number
  width: number
  height: number
}

const PADDLE_FORCE_MAGNITUDE = 0.02
enum Direction {
  FORWARD = -1,
  BACKWARD = 1
}

const Kayak: React.FC<KayakProps> = ({x, y, width, height}) => {
  const engine = useEngine();
  const body = useRef<Body>()
  const graphics = useRef<PixiGraphics>(null)
  const keyPressed = useRef<Record<string, boolean>>({})

  const draw = (g: PixiGraphics, b: Body) => {
    g.clear()
    g.beginFill('yellow')

    const startPos = b.vertices[0]
    g.moveTo(startPos.x, startPos.y)
    for (let j = 1; j < b.vertices.length; j++) {
      const drawPos = b.vertices[j]
      g.lineTo(drawPos.x, drawPos.y)
    }
    g.lineTo(startPos.x, startPos.y)
    g.endFill()

    // Draw center of mass
    g.beginFill('red')
    g.drawCircle(b.position.x, b.position.y, width / 4)
    g.endFill()
  }

  const moveVertical = (b: Body, direction: Direction) => {
    const force = {
      x: Math.sin(b.angle) * PADDLE_FORCE_MAGNITUDE,
      y: Math.cos(b.angle) * PADDLE_FORCE_MAGNITUDE * direction
    }
    Body.applyForce(b, b.position, force)
  }

  const move = (b: Body) => {
    if(keyPressed.current[CODE_W]) {
      moveVertical(b, Direction.FORWARD)
    }
    if (keyPressed.current[CODE_S]) {
      moveVertical(b, Direction.BACKWARD)
    }
  }

  useTick( ()=> {
    const g = graphics.current
    const b = body.current

    if(!g || !b) return

    move(b)
    draw(g, b)
  })

  useEffect(() => {
    if (!engine) return

    body.current = Bodies.rectangle(x, y, width, height, {
      friction: 0.02,
      frictionAir: 0.02,
      density: 0.01
    })

    Composite.add(engine.world, body.current)
  }, [engine, height, width, x, y]);

  const onKeyDown = (event: KeyboardEvent) => {
    keyPressed.current[event.code] = true
  }

  const onKeyUp = (event: KeyboardEvent) => {
    keyPressed.current[event.code] = false
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, []);

  return <Graphics ref={graphics} />
};

export default Kayak;
