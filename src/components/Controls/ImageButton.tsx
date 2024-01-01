import React, { useEffect, useRef } from "react";

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
  const intervalRef = useRef<NodeJS.Timeout>();

  const onPointerDown = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      onPress();
    }, 1000 / 10); // Rune limits to 10 actions per sec
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  useEffect(() => {
    return () => stopInterval();
  }, []);

  return (
    <button
      onPointerDown={onPointerDown}
      onPointerUp={stopInterval}
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
