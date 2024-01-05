import React from "react";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

export interface ShipGraphicsProps {
  x: number;
  y: number;
  size: number;
  rotation: number;
  hasTurret?: boolean;
}

const ShipGraphics: React.FC<ShipGraphicsProps> = ({
  x,
  y,
  size,
  rotation,
  hasTurret,
}) => {
  const draw = (g: PixiGraphics) => {
    g.clear();

    g.position.set(x, y);
    g.rotation = rotation;

    const halfSize = size / 2;

    // Ship body
    g.beginFill(0xa3e635); // Hexadecimal color for fill
    g.moveTo(halfSize, 0); // Start at the tip (right side)
    g.lineTo(-halfSize, -halfSize); // Left top
    g.lineTo(-halfSize, halfSize); // Left bottom
    g.lineTo(halfSize, 0); // Back to the tip
    g.endFill();

    if (hasTurret) {
      // Line from tip towards center
      g.lineStyle(3, 0xf87171, 1); // White line, 2px wide
      g.moveTo(halfSize, 0); // Start at the tip
      g.lineTo(0, 0); // Draw line towards the center

      // Pilot seat
      g.lineStyle(2, 0xf87171);
      g.beginFill("white");
      g.drawCircle(-halfSize / 3, 0, halfSize / 3);
      g.endFill();
    }
  };

  return <Graphics draw={draw} anchor={0.5} />;
};

export default ShipGraphics;
