import React from "react";
import ShipGraphics, { ShipGraphicsProps } from "./ShipGraphics.tsx";
import usePlayerControls from "../../../hooks/usePlayerControls.ts";
import { nanoid } from "nanoid";
import { PlayerRole } from "../../../logic/types.ts";

interface ShipProps extends ShipGraphicsProps {
  role: PlayerRole;
}

const ROTATION_SPEED = 0.2;

const Ship: React.FC<ShipProps> = ({ role, rotation, x, y, size }) => {
  const onRotateLeft = () => {
    if (role === PlayerRole.Overwatch) return;
    Rune.actions.rotate(-ROTATION_SPEED);
  };

  const onRotateRight = () => {
    if (role === PlayerRole.Overwatch) return;
    Rune.actions.rotate(ROTATION_SPEED);
  };

  const onTap = () => {
    if (role === PlayerRole.Overwatch) return;
    Rune.actions.shoot(nanoid());
  };

  usePlayerControls({
    onRotateRight,
    onRotateLeft,
    onTap,
  });

  return <ShipGraphics rotation={rotation} x={x} y={y} size={size} />;
};

export default Ship;
