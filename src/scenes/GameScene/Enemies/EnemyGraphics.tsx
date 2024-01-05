import React from "react";
import CircleGraphics from "../CircleGraphics";

interface BulletGraphicsProps {
  x: number;
  y: number;
  size: number;
  showPilot?: boolean;
}

const EnemyGraphics: React.FC<BulletGraphicsProps> = ({
  x,
  y,
  size,
  showPilot,
}) => {
  return (
    <>
      <CircleGraphics x={x} y={y} size={size} color="EF4444" />
      {showPilot && (
        <CircleGraphics x={x} y={y} size={size / 2} color="white" />
      )}
    </>
  );
};

export default EnemyGraphics;
