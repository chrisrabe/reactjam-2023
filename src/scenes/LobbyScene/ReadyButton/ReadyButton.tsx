import React from "react";

interface ReadyButtonProps {
  color: string;
}

const ReadyButton: React.FC<ReadyButtonProps> = ({ color }) => {
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
      }}
    >
      Ready (0/2)
    </button>
  );
};

export default ReadyButton;
