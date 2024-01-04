import { useEffect, useRef } from "react";
import { Vector2D } from "../logic/types.ts";

const TAP_THRESHOLD = 200; // 200ms
const MIN_DRAG_DISTANCE = 50;

export interface Pointer {
  position: Vector2D;
}

interface PlayerControlHookProps {
  onPointerDown?: (pointer: Pointer) => void;
  onPointerUp?: (pointer: Pointer) => void;
  onPointerMove?: (pointer: Pointer) => void;
  onTap?: (pointer: Pointer) => void;
  disabled?: boolean;
}

const usePlayerControls = ({
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onTap,
  disabled,
}: PlayerControlHookProps) => {
  const pointerDownTime = useRef<number>(0);
  const pointerDownPos = useRef<Vector2D>();

  const handlePointerDown = (event: PointerEvent) => {
    pointerDownTime.current = Date.now();

    if (!onPointerDown) return;
    const position: Vector2D = {
      x: event.clientX,
      y: event.clientY,
    };

    pointerDownPos.current = position;

    onPointerDown({
      position,
    });
  };

  const handlePointerUp = (event: PointerEvent) => {
    const pointerUpTime = Date.now();
    const duration = pointerUpTime - pointerDownTime.current;
    pointerDownPos.current = undefined;

    if (onTap && duration < TAP_THRESHOLD) {
      onTap({
        position: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    }

    if (!onPointerUp) return;
    onPointerUp({
      position: { x: event.clientX, y: event.clientY },
    });
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!onPointerMove) return;
    if (!pointerDownPos.current) return;

    const position = {
      x: event.clientX,
      y: event.clientY,
    };

    const dx = position.x - pointerDownPos.current.x;
    const dy = position.y - pointerDownPos.current.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance >= MIN_DRAG_DISTANCE) {
      onPointerMove({
        position: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    }
  };

  useEffect(() => {
    if (disabled) return;

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);
};

export default usePlayerControls;
