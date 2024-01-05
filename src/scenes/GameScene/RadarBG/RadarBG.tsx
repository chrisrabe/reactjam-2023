import React from "react";
import { TilingSprite } from "@pixi/react";

interface RadarBGProps {
  width: number;
  height: number;
}

const RadarBG: React.FC<RadarBGProps> = ({ width, height }) => {
  return (
    <TilingSprite
      image="/assets/bg/grid_tile.jpg"
      width={width}
      height={height}
      tilePosition={{ x: 0, y: 0 }}
    />
  );
};

export default RadarBG;
