import { useEffect, useRef } from "react";
import { Vector2D } from "../logic/types.ts";

const TAP_THRESHOLD = 200; // 200ms

interface PlayerControlHookProps {
  onTap?: (params: { position: Vector2D }) => void;
  disabled?: boolean;
}

const usePlayerControls = ({ onTap, disabled }: PlayerControlHookProps) => {
  const pointerDownTime = useRef<number>(0);

  const onPointerDown = () => {
    pointerDownTime.current = Date.now();
  };

  const onPointerUp = (event: PointerEvent) => {
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
  };

  useEffect(() => {
    if (disabled) return;

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);
};

export default usePlayerControls;
