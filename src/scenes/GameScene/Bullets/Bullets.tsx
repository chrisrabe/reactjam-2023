import React from "react";
import { Container } from "@pixi/react";
import BulletGraphics from "./BulletGraphics.tsx";
import { Bullet, Dimensions } from "../../../logic/types.ts";

interface BulletsProps {
  bullets: Record<string, Bullet>;
  scaleContext: Dimensions;
}

const Bullets: React.FC<BulletsProps> = ({ bullets, scaleContext }) => {
  return (
    <Container name="bullets">
      {Object.values(bullets).map((bullet) => (
        <BulletGraphics
          key={bullet.id}
          x={bullet.position[0] * scaleContext.width}
          y={bullet.position[1] * scaleContext.height}
          size={bullet.size * scaleContext.width}
        />
      ))}
    </Container>
  );
};

export default Bullets;
