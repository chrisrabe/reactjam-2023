import { useEffect } from "react";
import { MOVE_LEFT, MOVE_RIGHT, TAPPED } from "../utils/events.ts";
import { Vector2D } from "../logic/types.ts";

interface PlayerControlHookProps {
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
  onTap?: (params: { position: Vector2D }) => void;
}

const usePlayerControls = ({
  onRotateLeft,
  onRotateRight,
  onTap,
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
    document.addEventListener(MOVE_LEFT, handleRotateLeft);
    document.addEventListener(MOVE_RIGHT, handleRotateRight);
    document.addEventListener(TAPPED, handleTap);

    return () => {
      document.removeEventListener(MOVE_LEFT, handleRotateLeft);
      document.removeEventListener(MOVE_RIGHT, handleRotateLeft);
      document.removeEventListener(TAPPED, handleTap);
    };
  }, []);
};

export default usePlayerControls;
