import React, { useRef } from "react";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

interface ShipGraphicsProps {
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const ShipGraphics: React.FC<ShipGraphicsProps> = ({
  x,
  y,
  size,
  rotation,
}) => {
  const draw = (g: PixiGraphics) => {
    g.clear();

    g.position.set(x, y);
    g.rotation = rotation;

    const halfSize = size / 2;
    const tipSize = size / 5; // size of front tip

    // Ship body
    g.beginFill("4ADE80");
    g.moveTo(0, -halfSize);
    g.lineTo(-halfSize, halfSize);
    g.lineTo(halfSize, halfSize);
    g.lineTo(0, -halfSize);
    g.endFill();

    // Tip of ship
    g.beginFill("EF4444");
    g.moveTo(0, -halfSize);
    g.lineTo(-tipSize / 2, -halfSize + tipSize);
    g.lineTo(tipSize / 2, -halfSize + tipSize);
    g.lineTo(0, -halfSize);
    g.endFill();
  };

  return <Graphics draw={draw} anchor={0.5} />;
};

export default ShipGraphics;
