import React from "react";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

export interface ShipGraphicsProps {
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
    const tipSize = size / 5;

    // Ship body
    g.beginFill(0xa3e635); // Hexadecimal color for fill
    g.moveTo(halfSize, 0); // Start at the tip (right side)
    g.lineTo(-halfSize, -halfSize); // Left top
    g.lineTo(-halfSize, halfSize); // Left bottom
    g.lineTo(halfSize, 0); // Back to the tip
    g.endFill();

    // Tip of ship
    g.beginFill(0xf87171); // Hexadecimal color for fill
    g.moveTo(halfSize, 0); // Start at the tip
    g.lineTo(halfSize - tipSize, -tipSize / 2); // Tip left top
    g.lineTo(halfSize - tipSize, tipSize / 2); // Tip left bottom
    g.lineTo(halfSize, 0); // Back to the tip
    g.endFill();
  };

  return <Graphics draw={draw} anchor={0.5} />;
};

export default ShipGraphics;
