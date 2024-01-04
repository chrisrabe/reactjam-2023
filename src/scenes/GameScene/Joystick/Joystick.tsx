import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";
import usePlayerControls, {
  Pointer,
} from "../../../hooks/usePlayerControls.ts";
import { Vector2D } from "../../../logic/types.ts";
import JoystickGraphics from "./JoystickGraphics.tsx";

const Joystick: React.FC = () => {
  const joystickPos = useRef<Vector2D>();
  const [rotation, setRotation] = useState(0);

  const onTap = () => {
    Rune.actions.shoot(nanoid());
  };

  const onPointerDown = (pointer: Pointer) => {
    if (joystickPos.current) return;
    joystickPos.current = pointer.position;
  };

  const onPointerUp = () => {
    joystickPos.current = undefined;
    setRotation(0);
  };

  const onPointerMove = (pointer: Pointer) => {
    if (!joystickPos.current) return;

    const dx = pointer.position.x - joystickPos.current.x;
    const dy = pointer.position.y - joystickPos.current.y;

    const angle = Math.atan2(dy, dx);

    setRotation(angle);
  };

  usePlayerControls({
    onPointerUp,
    onPointerDown,
    onPointerMove,
    onTap,
  });

  return (
    <>
      {joystickPos.current && (
        <JoystickGraphics
          position={joystickPos.current}
          size={50}
          rotation={rotation}
        />
      )}
    </>
  );
};

export default Joystick;
