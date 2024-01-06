import React, { ReactNode } from "react";

interface OverlayProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  scale: number;
  color: string;
  children: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  setIsOpen,
  scale,
  color,
  children,
}) => {
  if (!isOpen) return <></>;

  return (
    <div
      style={{
        position: "absolute",
        top: "25%",
        width: "80%",
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          background: "#18181B",
          padding: 20 * scale,
          borderRadius: 20,
          boxShadow: `0 0 15px 3px ${color}`,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
