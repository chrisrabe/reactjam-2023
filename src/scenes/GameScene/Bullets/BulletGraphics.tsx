import React from "react";
import CircleGraphics from "../CircleGraphics";

interface BulletGraphicsProps {
  x: number;
  y: number;
  size: number;
}

const BulletGraphics: React.FC<BulletGraphicsProps> = ({ x, y, size }) => {
  return <CircleGraphics x={x} y={y} color="white" size={size} />;
};

export default BulletGraphics;
