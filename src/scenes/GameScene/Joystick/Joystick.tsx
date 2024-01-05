import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";
import usePlayerControls, {
  Pointer,
} from "../../../hooks/usePlayerControls.ts";
import { Vector2D } from "../../../logic/types.ts";
import JoystickGraphics from "./JoystickGraphics.tsx";
import useThrottle from "../../../hooks/useThrottle.ts";
import { playSound } from "../../../sounds.ts";

const THROTTLE_LIMIT = 100; // 100ms (10 actions / sec)

const Joystick: React.FC = () => {
  const joystickPos = useRef<Vector2D>();
  const [rotation, setRotation] = useState(0);
  const hasRotationLine = useRef<boolean>(false);

  const onTap = () => {
    playSound("laser", { once: true });
    hasRotationLine.current = false;
    Rune.actions.shoot(nanoid());
  };

  const onPointerDown = (pointer: Pointer) => {
    if (joystickPos.current) return;
    joystickPos.current = pointer.position;
  };

  const onPointerUp = () => {
    joystickPos.current = undefined;
    hasRotationLine.current = false;
    setRotation(0);
  };

  const onPointerMove = (pointer: Pointer) => {
    if (!joystickPos.current) return;

    const dx = pointer.position.x - joystickPos.current.x;
    const dy = pointer.position.y - joystickPos.current.y;

    const angle = Math.atan2(dy, dx);

    hasRotationLine.current = true;
    setRotation(angle);
    Rune.actions.setRotation(angle);
  };

  const throttledPointerMove = useThrottle(onPointerMove, THROTTLE_LIMIT);

  usePlayerControls({
    onPointerUp,
    onPointerDown,
    onPointerMove: throttledPointerMove,
    onTap,
  });

  return (
    <>
      {joystickPos.current && (
        <JoystickGraphics
          position={joystickPos.current}
          size={50}
          rotation={rotation}
          hasRotationLine={hasRotationLine.current}
        />
      )}
    </>
  );
};

export default Joystick;
