import React from "react";
import { PlayerRole } from "../../../logic/types.ts";

interface RoleButtonProps {
  role: PlayerRole;
  isSelected: boolean;
  playerNames: string[];
  onClick: () => void;
  color: string;
  disabled: boolean;
}

const RoleButton: React.FC<RoleButtonProps> = ({
  role,
  isSelected,
  playerNames,
  onClick,
  color,
  disabled,
}) => {
  const btnColor = isSelected
    ? {
        boxShadow: `0 0 15px 3px ${color}`,
        background: color,
      }
    : {};

  return (
    <button
      style={{
        height: "5rem",
        display: "flex",
        justifyContent: "start",
        gap: "1.5rem",
        alignItems: "center",
        width: "100%",
        position: "relative",
        border: "none",
        background: "none",
        textAlign: "start",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src={`/assets/avatars/${role}_avatar.jpg`}
        alt="Pilot avatar"
        style={{
          height: "inherit",
          borderRadius: "50%",
          position: "absolute",
          borderWidth: 2,
          borderColor: isSelected ? color : "white",
          borderStyle: "solid",
          ...btnColor,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginLeft: 20,
          paddingLeft: "5rem",
          paddingTop: 10,
          paddingBottom: 10,
          color: isSelected ? "#18181B" : "white",
          borderTopRightRadius: 20,
          ...btnColor,
        }}
      >
        <h2 style={{ margin: 0, textTransform: "capitalize" }}>{role}</h2>
        <span
          style={{
            fontStyle: playerNames.length === 0 ? "italic" : "inherit",
          }}
        >
          {playerNames.length > 0 ? playerNames.join(", ") : "None"}
        </span>
      </div>
    </button>
  );
};

export default RoleButton;
