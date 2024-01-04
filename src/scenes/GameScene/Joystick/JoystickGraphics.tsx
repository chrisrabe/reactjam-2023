import React from "react";
import { Vector2D } from "../../../logic/types.ts";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

interface JoystickGraphicsProps {
  position: Vector2D;
  size: number;
  rotation: number;
}

const JoystickGraphics: React.FC<JoystickGraphicsProps> = ({
  position,
  size,
  rotation,
}) => {
  const draw = (g: PixiGraphics) => {
    g.clear();
    g.position.set(position.x, position.y);
    g.rotation = rotation;

    // Set style for outer circle outline
    g.lineStyle(2, "white", 1); // 2px wide white line
    g.drawCircle(0, 0, size); // Draw the outer circle

    // Draw smaller inner circle representing center position
    const innerCircleSize = size / 4;
    g.beginFill("white"); // Black color for the inner circle
    g.drawCircle(0, 0, innerCircleSize);
    g.endFill();

    // Convert rotation to radians and draw the rotation line
    const rotationRadians = rotation * (Math.PI / 180);
    const lineLength = size; // Line extends to the edge of the outer circle
    g.moveTo(0, 0); // Start at the center
    g.lineTo(
      lineLength * Math.cos(rotationRadians),
      lineLength * Math.sin(rotationRadians),
    ); // End point based on rotation
  };
  return <Graphics draw={draw} />;
};

export default JoystickGraphics;
