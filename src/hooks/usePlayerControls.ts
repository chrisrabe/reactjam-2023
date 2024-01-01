import { useEffect } from "react";
import { MOVE_LEFT, MOVE_RIGHT, TAPPED } from "../utils/events.ts";

interface PlayerControlHookProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onTap: () => void;
  disabled?: boolean;
}

const usePlayerControls = ({
  onRotateLeft,
  onRotateRight,
  onTap,
  disabled,
}: PlayerControlHookProps) => {
  useEffect(() => {
    if (disabled) return;

    document.addEventListener(MOVE_LEFT, onRotateLeft);
    document.addEventListener(MOVE_RIGHT, onRotateRight);
    document.addEventListener(TAPPED, onTap);

    return () => {
      document.removeEventListener(MOVE_LEFT, onRotateLeft);
      document.removeEventListener(MOVE_RIGHT, onRotateRight);
      document.removeEventListener(TAPPED, onTap);
    };
  }, [onRotateLeft, onRotateRight, disabled]);
};

export default usePlayerControls;
