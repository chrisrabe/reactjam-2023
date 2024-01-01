import React from "react";
import ShipGraphics, { ShipGraphicsProps } from "./ShipGraphics.tsx";
import usePlayerControls from "../../hooks/usePlayerControls.ts";

interface ShipProps extends ShipGraphicsProps {
  hasControls?: boolean;
}

const ROTATION_SPEED = 0.2;

const Ship: React.FC<ShipProps> = ({
  hasControls,
  rotation,
  ...graphicsProps
}) => {
  const onRotateLeft = () => {
    Rune.actions.rotate(-ROTATION_SPEED);
  };

  const onRotateRight = () => {
    Rune.actions.rotate(ROTATION_SPEED);
  };

  usePlayerControls({
    onRotateRight,
    onRotateLeft,
    disabled: !hasControls,
  });

  return <ShipGraphics rotation={rotation} {...graphicsProps} />;
};

export default Ship;
