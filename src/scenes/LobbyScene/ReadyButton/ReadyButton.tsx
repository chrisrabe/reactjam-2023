import React from "react";

interface ReadyButtonProps {
  color: string;
  numReady: number;
  isReady: boolean;
}

const ReadyButton: React.FC<ReadyButtonProps> = ({
  color,
  numReady,
  isReady,
}) => {
  return (
    <button
      style={{
        border: "none",
        backgroundColor: color,
        padding: "1rem",
        width: "80%",
        fontSize: "1.5rem",
        fontWeight: "bold",
        borderRadius: 20,
        gap: 5,
        display: "flex",
        justifyContent: "center",
      }}
      onClick={() => Rune.actions.toggleReady()}
    >
      <span>{isReady ? "Abort" : "Ready Up"}</span>
      <span>({numReady}/2)</span>
    </button>
  );
};

export default ReadyButton;
