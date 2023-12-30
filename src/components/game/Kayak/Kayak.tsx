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

    // Draw impulse
    if (forcePointApplication.current) {
      const f = forcePointApplication.current
      const forcePointRadius = 5; // Radius of the circle to represent the force point
      g.beginFill(0xff0000); // Red color for the force application point
      g.drawCircle(f.x, f.y, forcePointRadius);
      g.endFill();
    }
  }

  const getForceMagnitude = (bz: number, fz: number, mass: number) => {
    const forceMagnitude = 0.001 * mass
    if (bz === fz) return 0
    if (bz < fz) return -forceMagnitude
    return forceMagnitude
  }

  const move = (b: Body) => {
    const f = forcePointApplication.current

    if(f) {
      const forceDirection: Vector2D = {
        x: getForceMagnitude(b.position.x, f.x, b.mass),
        y: getForceMagnitude(b.position.y, f.y, b.mass),
      }

      Body.applyForce(b, f, forceDirection)
    }
  }

  const reset = () => {
    forcePointApplication.current = undefined
  }

  useTick( ()=> {
    const g = graphics.current
    const b = body.current

    if(!g || !b) return

    move(b)
    draw(g, b)
    reset()
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

  const onMouseUp = (event: MouseEvent) => {
    const mouseX = event.clientX
    const mouseY = event.clientY

    forcePointApplication.current = {
      x: mouseX,
      y: mouseY
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, []);

  return <Graphics ref={graphics} />
};

export default Kayak;
