import React, { useEffect, useRef } from "react";
import ImageButton from "./ImageButton.tsx";
import { MOVE_LEFT, MOVE_RIGHT, TAPPED } from "../../../utils/events.ts";
import useThrottle from "../../../hooks/useThrottle.ts";

const BUTTON_SIZE = 50;
const TAP_THRESHOLD = 200; // 200ms
const THROTTLE_LIMIT = 100; // 100ms bc Rune can only do 10 events per sec

interface ControlsProps {
  rotationDisabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ rotationDisabled }) => {
  const pointerDownTime = useRef<number>(0);

  const onLeftPress = () => {
    document.dispatchEvent(new Event(MOVE_LEFT));
  };

  const onRightPress = () => {
    document.dispatchEvent(new Event(MOVE_RIGHT));
  };

  const throttledOnLeftPress = useThrottle(onLeftPress, THROTTLE_LIMIT);
  const throttledOnRightPress = useThrottle(onRightPress, THROTTLE_LIMIT);

  const onPointerDown = () => {
    pointerDownTime.current = Date.now();
  };

  const onPointerUp = (event: PointerEvent) => {
    const pointerUpTime = Date.now();
    const duration = pointerUpTime - pointerDownTime.current;

    if (duration < TAP_THRESHOLD) {
      document.dispatchEvent(
        new CustomEvent(TAPPED, {
          detail: {
            position: {
              x: event.clientX,
              y: event.clientY,
            },
          },
        }),
      );
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

  if (rotationDisabled) return <></>;

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
        onPress={throttledOnLeftPress}
        width={BUTTON_SIZE}
        height={BUTTON_SIZE}
      />
      <ImageButton
        image="assets/ui/right_button.svg"
        onPress={throttledOnRightPress}
        width={BUTTON_SIZE}
        height={BUTTON_SIZE}
      />
    </div>
  );
};

export default Controls;
