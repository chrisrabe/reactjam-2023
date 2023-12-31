import React, {RefObject, useRef} from "react";
import {Graphics, useTick} from "@pixi/react";
import {Graphics as PixiGraphics} from "pixi.js"
import {Body} from "matter-js";

interface KayakGraphicsProps {
  bodyRef: RefObject<Body | undefined>
  width: number
  height: number
}

const KayakGraphics: React.FC<KayakGraphicsProps> = ({bodyRef, width, height}) => {
  const graphics = useRef<PixiGraphics>(null)

  useTick(() => {
    const g = graphics.current;
    const b = bodyRef.current;

    if(!b || !g) return

    g.clear();

    // Set the position and rotation of the PIXI graphics to match the body
    g.position.set(b.position.x, b.position.y);
    g.rotation = b.angle; // Match the rotation of the body

    // Draw the ellipse
    g.beginFill(0xffff00); // Using numeric color for PIXI
    g.drawEllipse(0, 0, width / 2, height /2); // Draw ellipse at origin
    g.endFill();
  })

  return <Graphics ref={graphics}/>
}

export default KayakGraphics;
