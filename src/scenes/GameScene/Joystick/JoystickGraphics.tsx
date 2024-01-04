import React from "react";
import { Vector2D } from "../../../logic/types.ts";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

interface JoystickGraphicsProps {
  position: Vector2D;
  size: number;
}

const JoystickGraphics: React.FC<JoystickGraphicsProps> = ({
  position,
  size,
}) => {
  const draw = (g: PixiGraphics) => {
    g.clear();
    g.position.set(position.x, position.y);

    // Set style for outer circle outline
    g.lineStyle(2, "white", 1); // 2px wide white line
    g.drawCircle(0, 0, size); // Draw the outer circle

    // Draw smaller inner circle representing center position
    const innerCircleSize = size / 4;
    g.beginFill("white"); // Black color for the inner circle
    g.drawCircle(0, 0, innerCircleSize);
    g.endFill();
  };
  return <Graphics draw={draw} />;
};

export default JoystickGraphics;
