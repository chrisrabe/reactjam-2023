import { useEffect, useRef } from "react";
import { Vector2D } from "../logic/types.ts";

const TAP_THRESHOLD = 200; // 200ms

interface PlayerControlHookProps {
  onPointerDown?: (params: { position: Vector2D }) => void;
  onPointerUp?: (params: { position: Vector2D }) => void;
  onTap?: (params: { position: Vector2D }) => void;
  disabled?: boolean;
}

const usePlayerControls = ({
  onPointerDown,
  onPointerUp,
  onTap,
  disabled,
}: PlayerControlHookProps) => {
  const pointerDownTime = useRef<number>(0);

  const handlePointerDown = (event: PointerEvent) => {
    pointerDownTime.current = Date.now();

    if (!onPointerDown) return;

    onPointerDown({
      position: { x: event.clientX, y: event.clientY },
    });
  };

  const handlePointerUp = (event: PointerEvent) => {
    const pointerUpTime = Date.now();
    const duration = pointerUpTime - pointerDownTime.current;

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

  useEffect(() => {
    if (disabled) return;

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);
};

export default usePlayerControls;
