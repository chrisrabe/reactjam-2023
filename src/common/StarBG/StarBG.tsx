import React, { useState } from "react";
import { TilingSprite, useTick } from "@pixi/react";
import { Vector2D } from "../../logic/types.ts";
import starTile from "../../assets/bg/star_tile.jpg";

interface StarBGProps {
  width: number;
  height: number;
}

const PARALLAX_SPEED = 1;

const StarBG: React.FC<StarBGProps> = ({ width, height }) => {
  const [tilePos, setTilePos] = useState<Vector2D>({ x: 0, y: 0 });

  useTick((delta) => {
    setTilePos({
      x: tilePos.x + PARALLAX_SPEED * delta,
      y: tilePos.y + PARALLAX_SPEED * delta,
    });
  });

  return (
    <TilingSprite
      image={starTile}
      width={width}
      height={height}
      tilePosition={tilePos}
    />
  );
};

export default StarBG;
