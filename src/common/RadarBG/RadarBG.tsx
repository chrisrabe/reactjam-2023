import React, { useState } from "react";
import { Graphics, TilingSprite, useTick } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

interface RadarBGProps {
  width: number;
  height: number;
}

const ROTATION_SPEED = 0.01;

const RadarBG: React.FC<RadarBGProps> = ({ width, height }) => {
  const [rotation, setRotation] = useState(0);

  useTick((delta) => {
    setRotation(rotation + ROTATION_SPEED * delta);
  });

  const draw = (g: PixiGraphics) => {
    g.clear();
    g.position.set(width / 2, height / 2);
    g.rotation = rotation;
    g.lineStyle(2, 0x27272a, 1); // 2px wide white line

    const rotationRadians = rotation * (Math.PI / 180);
    const lineLength = height;
    g.moveTo(0, 0); // Start at the center
    g.lineTo(
      lineLength * Math.cos(rotationRadians),
      lineLength * Math.sin(rotationRadians),
    );
  };

  return (
    <>
      <TilingSprite
        image="/assets/bg/grid_tile.jpg"
        width={width}
        height={height}
        tilePosition={{ x: 0, y: 0 }}
      />
      <Graphics draw={draw} />
    </>
  );
};

export default RadarBG;
