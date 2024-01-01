import { useEffect } from "react";
import { MOVE_LEFT, MOVE_RIGHT } from "../utils/events.ts";

interface PlayerControlHookProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  disabled?: boolean;
}

const usePlayerControls = ({
  onRotateLeft,
  onRotateRight,
  disabled,
}: PlayerControlHookProps) => {
  useEffect(() => {
    if (disabled) return;

    document.addEventListener(MOVE_LEFT, onRotateLeft);
    document.addEventListener(MOVE_RIGHT, onRotateRight);

    return () => {
      document.removeEventListener(MOVE_LEFT, onRotateLeft);
      document.removeEventListener(MOVE_RIGHT, onRotateRight);
    };
  }, [onRotateLeft, onRotateRight, disabled]);
};

export default usePlayerControls;
