import React, { useState } from "react";
import { PlayerRole } from "../../../logic/types.ts";

interface TutorialProps {
  role: PlayerRole;
  color: string;
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

const Tutorial: React.FC<TutorialProps> = ({ role, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  const instructions = roleInstructions[role];

  return (
    <>
      <button
        style={{
          border: "none",
          backgroundColor: "unset",
          padding: "1rem",
          width: "80%",
          fontSize: "1.2rem",
          borderRadius: 20,
          gap: 5,
          color: "white",
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
        onClick={() => setIsOpen(true)}
      >
        How to play?
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              background: "#18181B",
              padding: 20,
              height: "50%",
              width: "80%",
              borderRadius: 20,
              boxShadow: `0 0 15px 3px ${color}`,
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
