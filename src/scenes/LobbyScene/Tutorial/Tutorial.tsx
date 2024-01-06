import React, { useState } from "react";
import { PlayerRole } from "../../../logic/types.ts";
import Overlay from "../../../common/Overlay";

interface TutorialProps {
  role: PlayerRole;
  color: string;
  scale: number;
}

interface Tutorial {
  objective: string;
  controls: string[];
}

const roleInstructions: Record<PlayerRole, Tutorial> = {
  spectator: {
    objective: "Watch the ongoing game",
    controls: ["sit back and watch"],
  },
  pilot: {
    objective:
      "Stationary but deadly. Eliminate invisible phantoms based on Overwatch's precise intel.",
    controls: [
      "Hold and drag to rotate",
      "Tap to shoot",
      "Double points for shooting marked enemies",
    ],
  },
  overwatch: {
    objective:
      "Guide the Pilot using the radar to detect and strategise against invisible phantoms, ensuring successful strikes.",
    controls: [
      "Tap enemies to notify pilot of their position",
      "Double points for having marked enemy shot",
    ],
  },
};

const Tutorial: React.FC<TutorialProps> = ({ role, color, scale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const instructions = roleInstructions[role];

  return (
    <>
      <button
        style={{
          border: "none",
          backgroundColor: "unset",
          padding: 20 * scale,
          fontSize: 16 * scale,
          color: "white",
        }}
        onClick={() => setIsOpen(true)}
      >
        How to play?
      </button>
      <Overlay
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        scale={scale}
        color={color}
      >
        <h2 style={{ textTransform: "capitalize" }}>{role}</h2>
        <p>{instructions.objective}</p>
        <ul>
          {instructions.controls.map((control) => (
            <li key={control}>{control}</li>
          ))}
        </ul>
      </Overlay>
    </>
  );
};

export default Tutorial;
