import React from "react";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

interface BulletGraphicsProps {
  x: number;
  y: number;
  size: number;
}

const BulletGraphics: React.FC<BulletGraphicsProps> = ({ x, y, size }) => {
  const draw = (g: PixiGraphics) => {
    g.clear();
    g.beginFill("white");
    g.drawCircle(x, y, size / 2);
    g.endFill();
  };

  return <Graphics draw={draw} anchor={0.5} />;
};

export default BulletGraphics;
