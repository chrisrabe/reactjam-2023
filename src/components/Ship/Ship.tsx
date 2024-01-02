import React from "react";
import ShipGraphics, { ShipGraphicsProps } from "./ShipGraphics.tsx";
import usePlayerControls from "../../hooks/usePlayerControls.ts";
import { nanoid } from "nanoid";

interface ShipProps extends ShipGraphicsProps {
  hasControls?: boolean;
}

const ROTATION_SPEED = 0.4;

const Ship: React.FC<ShipProps> = ({ hasControls, rotation, x, y, size }) => {
  const onRotateLeft = () => {
    Rune.actions.rotate(-ROTATION_SPEED);
  };

  const onRotateRight = () => {
    Rune.actions.rotate(ROTATION_SPEED);
  };

  const onTap = () => {
    Rune.actions.shoot(nanoid());
  };

  usePlayerControls({
    onRotateRight,
    onRotateLeft,
    onTap,
    disabled: !hasControls,
  });

  return <ShipGraphics rotation={rotation} x={x} y={y} size={size} />;
};

export default Ship;
