import React from "react";

interface HUDProps {
  score: number;
}

const HUD: React.FC<HUDProps> = ({ score }) => (
  <div
    style={{
      position: "absolute",
      width: "100vw",
      top: 0,
      left: 0,
      zIndex: 100,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        color: "white",
        padding: "1rem",
      }}
    >
      <span
        style={{
          background: "#484848",
          padding: "0.75rem",
          borderRadius: "0.5rem",
          minWidth: "50%",
          textAlign: "center",
        }}
      >
        Score: {score}
      </span>
    </div>
  </div>
);

export default HUD;
