import React, {useEffect, useRef} from "react";
import {useEngine} from "../../common/World";
import {Bodies, Body, Composite} from "matter-js";
import {Graphics as PixiGraphics} from "pixi.js";
import {Graphics, useTick} from "@pixi/react";
import Vector2D from "../../../types/Vector2D.ts";
import {CODE_W, CODE_A, CODE_D} from "keycode-js";

interface KayakProps {
  x: number
  y: number
  width: number
  height: number
}

const Kayak: React.FC<KayakProps> = ({x, y, width, height}) => {
  const engine = useEngine();
  const body = useRef<Body>()
  const graphics = useRef<PixiGraphics>(null)
  const forcePointApplication = useRef<Vector2D>()
  const keyPressed = useRef<Record<string, boolean>>({})

  const moveForward = (b: Body) => {
    const forceMagnitude = 0.005 * b.mass

    // Extend the point a bit further behind the kayak
    const extensionBeyondStern = 5;  // Adjust this value based on your requirement

    forcePointApplication.current = {
      x: b.position.x - (width + extensionBeyondStern) * Math.sin(b.angle),
      y: b.position.y + (height + extensionBeyondStern) * Math.cos(b.angle)

    }
    Body.applyForce(b, forcePointApplication.current, {
      x: Math.cos(b.angle) * forceMagnitude,
      y: Math.sin(b.angle) * forceMagnitude
    })
  }

  const turnKayak = (b: Body, direction: number) => {
    const torqueMagnitude = 0.01
    // Body.setAngularVelocity(b, 0)
    Body.applyForce(b, b.position, {
      x: 0,
      y: direction * torqueMagnitude
    })
  }

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

    // Draw impulse
    if (forcePointApplication.current) {
      const f = forcePointApplication.current
      const forcePointRadius = 5; // Radius of the circle to represent the force point
      g.beginFill(0xff0000); // Red color for the force application point
      g.drawCircle(f.x, f.y, forcePointRadius);
      g.endFill();
    }
  }

  const move = (b: Body) => {
    const pressed = keyPressed.current

    if(pressed[CODE_W]) {
      moveForward(b)
    }
    if(pressed[CODE_A]) {
      turnKayak(b, -1)
    }
    if(pressed[CODE_D]) {
      turnKayak(b, 1)
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
      density: 0.001
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
