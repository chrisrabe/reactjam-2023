import React, { PointerEvent, useEffect, useRef } from "react";

interface ImageButtonProps {
  onPress: () => void;
  image: string;
  width: number;
  height: number;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  onPress,
  image,
  width,
  height,
}) => {
  return (
    <button
      onClick={onPress}
      style={{ border: "none", background: "none", width, height }}
    >
      <img
        src={image}
        alt="Button"
        style={{ width: "inherit", height: "inherit", pointerEvents: "none" }}
        unselectable="on"
      />
    </button>
  );
};

export default ImageButton;
