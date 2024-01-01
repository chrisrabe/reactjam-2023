import React, { useRef } from "react";
import { Container } from "@pixi/react";
import BulletGraphics from "./BulletGraphics.tsx";
import { Bullet } from "../../logic/types.ts";
import { Interpolator } from "rune-games-sdk";
import useGameStateListener, {
  ChangeParams,
} from "../../hooks/useGameStateListener.ts";

interface BulletsProps {
  bullets: Record<string, Bullet>;
}

const BULLET_SIZE = 15;

const Bullets: React.FC<BulletsProps> = ({ bullets }) => {
  const bulletInterpolators = useRef<
    Record<string, Interpolator<[number, number]>>
  >({});

  const onGameStateChange = ({ game, futureGame }: ChangeParams) => {
    for (const bulletId of Object.keys(game.bullets)) {
      if (!bulletInterpolators.current[bulletId]) {
        bulletInterpolators.current[bulletId] =
          Rune.interpolator<[number, number]>();
      }

      const interpolator = bulletInterpolators.current[bulletId];
      interpolator.update({
        game: game.bullets[bulletId].position,
        futureGame: futureGame?.bullets[bulletId]
          ? futureGame?.bullets[bulletId].position
          : game.bullets[bulletId].position,
      });
    }
  };

  useGameStateListener({ onGameStateChange });

  return (
    <Container name="bullets">
      {Object.keys(bullets).map((bulletId) => {
        const bulletData = bullets[bulletId];
        const interpolator = bulletInterpolators.current[bulletId];

        if (!bulletData || !interpolator) {
          console.warn(
            "No bullet data or interpolator",
            bulletData,
            interpolator,
          );
          return <></>;
        }

        const position = interpolator.getPosition();

        return (
          <BulletGraphics
            key={bulletId}
            x={position[0]}
            y={position[1]}
            size={BULLET_SIZE}
          />
        );
      })}
    </Container>
  );
};

export default Bullets;
