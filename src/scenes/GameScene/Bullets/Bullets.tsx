import React from "react";
import { Container } from "@pixi/react";
import BulletGraphics from "./BulletGraphics.tsx";
import { Bullet } from "../../../logic/types.ts";

interface BulletsProps {
  bullets: Record<string, Bullet>;
}

const Bullets: React.FC<BulletsProps> = ({ bullets }) => {
  return (
    <Container name="bullets">
      {Object.values(bullets).map((bullet) => (
        <BulletGraphics
          key={bullet.id}
          x={bullet.position[0]}
          y={bullet.position[1]}
          size={bullet.size}
        />
      ))}
    </Container>
  );
};

export default Bullets;
