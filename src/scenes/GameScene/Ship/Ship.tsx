import React from "react";
import ShipGraphics, { ShipGraphicsProps } from "./ShipGraphics.tsx";
import usePlayerControls from "../../../hooks/usePlayerControls.ts";
import { nanoid } from "nanoid";
import { PlayerRole } from "../../../logic/types.ts";

interface ShipProps extends ShipGraphicsProps {
  role: PlayerRole;
}

const Ship: React.FC<ShipProps> = ({ role, rotation, x, y, size }) => {
  const onTap = () => {
    Rune.actions.shoot(nanoid());
  };

  usePlayerControls({
    onTap,
    disabled: role !== PlayerRole.Pilot,
  });

  return <ShipGraphics rotation={rotation} x={x} y={y} size={size} />;
};

export default Ship;
