import React from "react";
import { PlayerRole } from "../../logic/types.ts";
import StarBG from "../StarBG";
import RadarBG from "../RadarBG";

interface RoleBGProps {
  playerRole: PlayerRole;
  width: number;
  height: number;
}

const RoleBG: React.FC<RoleBGProps> = ({ playerRole, width, height }) => {
  return (
    <>
      {playerRole === PlayerRole.Pilot && (
        <StarBG width={width} height={height} />
      )}
      {playerRole === PlayerRole.Overwatch && (
        <RadarBG width={width} height={height} />
      )}
    </>
  );
};

export default RoleBG;
