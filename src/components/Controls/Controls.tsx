import React, { useEffect, useRef } from "react";
import ImageButton from "./ImageButton.tsx";
import { MOVE_LEFT, MOVE_RIGHT, TAPPED } from "../../utils/events.ts";

const BUTTON_SIZE = 50;
const TAP_THRESHOLD = 200; // 200ms

const Controls: React.FC = () => {
  const pointerDownTime = useRef<number>(0);

  const onLeftPress = () => {
    document.dispatchEvent(new Event(MOVE_LEFT));
  };

  const onRightPress = () => {
    document.dispatchEvent(new Event(MOVE_RIGHT));
  };

  const onPointerDown = () => {
    pointerDownTime.current = Date.now();
  };

  const onPointerUp = () => {
    const pointerUpTime = Date.now();
    const duration = pointerUpTime - pointerDownTime.current;

    if (duration < TAP_THRESHOLD) {
      document.dispatchEvent(new Event(TAPPED));
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: window.innerHeight * 0.1,
        gap: BUTTON_SIZE,
        display: "flex",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <ImageButton
        image="assets/ui/left_button.svg"
        onPress={onLeftPress}
        width={BUTTON_SIZE}
        height={BUTTON_SIZE}
      />
      <ImageButton
        image="assets/ui/right_button.svg"
        onPress={onRightPress}
        width={BUTTON_SIZE}
        height={BUTTON_SIZE}
      />
    </div>
  );
};

export default Controls;
