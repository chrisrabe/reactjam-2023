import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";
import usePlayerControls from "../../../hooks/usePlayerControls.ts";
import { Vector2D } from "../../../logic/types.ts";
import JoystickGraphics from "./JoystickGraphics.tsx";

interface Pointer {
  position: Vector2D;
}

const Joystick: React.FC = () => {
  const [initialPointerPos, setInitialPointerPos] = useState<Vector2D>();

  const onTap = () => {
    Rune.actions.shoot(nanoid());
  };

  const onPointerDown = (pointer: Pointer) => {
    if (initialPointerPos) return;
    setInitialPointerPos(pointer.position);
  };

  const onPointerUp = (pointer: Pointer) => {
    setInitialPointerPos(undefined);
    // Retrieve rotation such that the initialPointerPos is facing the pointer parameter position
  };

  usePlayerControls({
    onPointerUp,
    onPointerDown,
    onTap,
  });

  return (
    <>
      {initialPointerPos && (
        <JoystickGraphics position={initialPointerPos} size={50} />
      )}
    </>
  );
};

export default Joystick;
