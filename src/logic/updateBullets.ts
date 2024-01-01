import { Bullet, GameState, Vector2D } from "./types.ts";
const BULLET_SPEED = 25;

const getUpdatedPosition = (bullet: Bullet): [number, number] => {
  const velocity: Vector2D = {
    x: Math.sin(bullet.rotation) * BULLET_SPEED,
    y: -Math.cos(bullet.rotation) * BULLET_SPEED,
  };
  const [x, y] = bullet.position;
  return [x + velocity.x, y + velocity.y];
};

const updateBullets = (game: GameState) => {
  if (game.newBullets.length > 0) {
    game.newBullets.forEach((bullet) => {
      game.bullets[Object.keys(game.bullets).length] = bullet;
    });
    game.newBullets = [];
  }
  for (const bulletId of Object.keys(game.bullets)) {
    const bullet = { ...game.bullets[bulletId] };
    bullet.position = getUpdatedPosition(bullet);
    game.bullets[bulletId] = bullet;
  }
};

export default updateBullets;
