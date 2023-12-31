import {useEffect} from "react";
import {CODE_D, CODE_A} from "keycode-js";
import {LEFT_PRESSED, RIGHT_PRESSED, TAPPED} from "../config/events.ts";

interface PlayerControlHookProps {
  onRotateLeft: () => void
  onRotateRight: () => void
  onMoveForward: () => void
}

const usePlayerControls = ({onRotateLeft, onRotateRight, onMoveForward}: PlayerControlHookProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === CODE_D) onRotateRight();
      if (event.code === CODE_A) onRotateLeft();
    };

    const onTap = () => onMoveForward();

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener(TAPPED, onTap);
    document.addEventListener(LEFT_PRESSED, onRotateLeft)
    document.addEventListener(RIGHT_PRESSED, onRotateRight)

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener(TAPPED, onTap);
      document.removeEventListener(LEFT_PRESSED, onRotateLeft)
      document.removeEventListener(RIGHT_PRESSED, onRotateRight)
    };
  }, [onRotateLeft, onRotateRight, onMoveForward]);
};

export default usePlayerControls;
