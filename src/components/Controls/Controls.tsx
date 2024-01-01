import React from "react";
import ImageButton from "./ImageButton.tsx";
import { MOVE_LEFT, MOVE_RIGHT } from "../../utils/events.ts";

const BUTTON_SIZE = 50;

const Controls: React.FC = () => {
  const onLeftPress = () => {
    document.dispatchEvent(new Event(MOVE_LEFT));
  };

  const onRightPress = () => {
    document.dispatchEvent(new Event(MOVE_RIGHT));
  };

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
