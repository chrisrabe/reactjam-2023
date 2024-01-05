import React, { useState } from "react";
import { PlayerRole } from "../../../logic/types.ts";

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
      "Stationary but deadly. Eliminate invisible enemies based on Overwatch's precise intel.",
    controls: ["Hold and drag to rotate", "Tap to shoot"],
  },
  overwatch: {
    objective:
      "Guide the Pilot using the radar to detect and strategise invisible enemies, ensuring successful strikes.",
    controls: ["Tap enemies to notify pilot of their position"],
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
      {isOpen && (
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
            <h2 style={{ textTransform: "capitalize" }}>{role}</h2>
            <p>{instructions.objective}</p>
            <ul>
              {instructions.controls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Tutorial;
