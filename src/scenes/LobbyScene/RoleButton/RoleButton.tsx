import React from "react";
import { PlayerRole } from "../../../logic/types.ts";

interface RoleButtonProps {
  role: PlayerRole;
  isSelected: boolean;
}

const RoleButton: React.FC<RoleButtonProps> = ({ role, isSelected }) => {
  const roleColor = role === PlayerRole.Pilot ? "#A3E635" : "#C084FC";
  const btnColor = isSelected
    ? {
        boxShadow: `0 0 15px 3px ${roleColor}`,
        background: roleColor,
      }
    : {};

  return (
    <div
      style={{
        height: "5rem",
        display: "flex",
        justifyContent: "start",
        gap: "1.5rem",
        alignItems: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <img
        src={`/assets/avatars/${role}_avatar.png`}
        alt="Pilot avatar"
        style={{
          height: "inherit",
          borderRadius: "50%",
          position: "absolute",
          borderWidth: 2,
          borderColor: isSelected ? roleColor : "white",
          borderStyle: "solid",
          ...btnColor,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginLeft: "20%",
          paddingLeft: "10%",
          paddingTop: 10,
          paddingBottom: 10,
          color: isSelected ? "#18181B" : "white",
          borderTopRightRadius: 20,
          ...btnColor,
        }}
      >
        <h2 style={{ margin: 0, textTransform: "capitalize" }}>{role}</h2>
        <span>You</span>
      </div>
    </div>
  );
};

export default RoleButton;
