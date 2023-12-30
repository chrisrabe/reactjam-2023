import React, {useEffect, useRef} from "react";
import {useEngine} from "../World";
import {Graphics, useTick} from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js"
import {Bodies, Body, Composite, IBodyDefinition} from "matter-js";

interface ShapeProps {
  type: "rectangle" | "circle" | "polygon" | "trapezoid"
  config: any
  options: IBodyDefinition
  lineStyle?: any
  fillStyle?: any
}

const Shape: React.FC<ShapeProps> = ({type, config, options, lineStyle = [1, '0C4A6E', 1], fillStyle = [0xff0000, 0]}) => {
  const engine = useEngine()
  const body = useRef<Body>()
  const graphics = useRef<PixiGraphics>(null)

  useTick((delta) => {
    const g = graphics.current
    const b = body.current

    if (!g || !b) return

    g.clear()
    g.lineStyle(...lineStyle)
    g.beginFill(...fillStyle)

    g.moveTo(b.vertices[0].x, b.vertices[0].y);
    for(let j = 1; j < b.vertices.length; j++) {
      const bodyVert = b.vertices[j]
      g.lineTo(bodyVert.x, bodyVert.y)
    }
    g.lineTo(b.vertices[0].x, b.vertices[0].y);

    if(/Circle/.test(b.label)) {
      g.moveTo(b.position.x, b.position.y)
      g.lineTo(b.position.x + Math.cos(b.angle) * config.radius, b.position.y + Math.sin(b.angle) * config.radius)
    }
  })

  useEffect(() => {
    if(!engine) return

    const args = Object.keys(config).reduce<any[]>((a, c) => [...a, config[c]], []);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    body.current = Bodies[type](...args, options)
    Composite.add(engine.world, body.current)
  }, []);

  return <Graphics ref={graphics} />
};

export default Shape;