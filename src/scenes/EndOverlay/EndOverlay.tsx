import React, { useEffect } from "react";
import Overlay from "../../common/Overlay";
import { PlayerRole } from "../../logic/types.ts";
import { roleColors } from "../../utils/role.ts";

interface EndOverlayProps {
  scale: number;
  role: PlayerRole;
  score: number;
}

const EndOverlay: React.FC<EndOverlayProps> = ({ scale, role, score }) => {
  useEffect(() => {
    setTimeout(() => {
      Rune.showGameOverPopUp();
    }, 3000);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Overlay
        isOpen
        setIsOpen={() => ({})}
        scale={scale}
        color={roleColors[role]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5 * scale,
          }}
        >
          <h2 style={{ textTransform: "capitalize", fontSize: 24 * scale }}>
            Game Over
          </h2>
          <p style={{ fontSize: 48 * scale }}>{score}</p>
          <p style={{ fontSize: 16 * scale }}>Final score</p>
        </div>
      </Overlay>
    </div>
  );
};

export default EndOverlay;
