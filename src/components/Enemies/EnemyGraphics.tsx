import React from "react";
import CircleGraphics from "../CircleGraphics";

interface BulletGraphicsProps {
  x: number;
  y: number;
  size: number;
}

const EnemyGraphics: React.FC<BulletGraphicsProps> = ({ x, y, size }) => {
  return <CircleGraphics x={x} y={y} size={size} color="red" />;
};

export default EnemyGraphics;
