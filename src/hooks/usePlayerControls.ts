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
  const handleTap = useCallback(
    (event: Event) => {
      if (!onTap) return;
      const e = event as CustomEvent;
      onTap(e.detail);
    },
    [onTap],
  );

  const handleRotateLeft = useCallback(() => {
    if (!onRotateLeft) return;
    onRotateLeft();
  }, [onRotateLeft]);

  const handleRotateRight = useCallback(() => {
    if (!onRotateRight) return;
    onRotateRight();
  }, [onRotateRight]);

  useEffect(() => {
    if (disabled) return;

    document.addEventListener(MOVE_LEFT, handleRotateLeft);
    document.addEventListener(MOVE_RIGHT, handleRotateRight);
    document.addEventListener(TAPPED, handleTap);

    return () => {
      document.removeEventListener(MOVE_LEFT, handleRotateLeft);
      document.removeEventListener(MOVE_RIGHT, handleRotateLeft);
      document.removeEventListener(TAPPED, handleTap);
    };
  }, [disabled, handleRotateLeft, handleRotateRight, handleTap]);
};

export default usePlayerControls;
