import { useCallback, useEffect } from "react";
import { MOVE_LEFT, MOVE_RIGHT, TAPPED } from "../utils/events.ts";
import { Vector2D } from "../logic/types.ts";

interface PlayerControlHookProps {
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
  onTap?: (params: { position: Vector2D }) => void;
  disabled?: boolean;
}

const usePlayerControls = ({
  onRotateLeft,
  onRotateRight,
  onTap,
  disabled,
}: PlayerControlHookProps) => {
  const handleTap = (event: Event) => {
    if (!onTap) return;
    const e = event as CustomEvent;
    onTap(e.detail);
  };

  const handleRotateLeft = () => {
    if (!onRotateLeft) return;
    onRotateLeft();
  };

  const handleRotateRight = () => {
    if (!onRotateRight) return;
    onRotateRight();
  };

  useEffect(() => {
    if (disabled) return;

    if (onRotateLeft) document.addEventListener(MOVE_LEFT, handleRotateLeft);
    if (onRotateRight) document.addEventListener(MOVE_RIGHT, handleRotateRight);
    if (onTap) document.addEventListener(TAPPED, handleTap);

    return () => {
      if (onRotateLeft)
        document.removeEventListener(MOVE_LEFT, handleRotateLeft);
      if (onRotateRight)
        document.removeEventListener(MOVE_RIGHT, handleRotateLeft);
      if (onTap) document.removeEventListener(TAPPED, handleTap);
    };
  }, []);
};

export default usePlayerControls;
