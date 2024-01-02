import { GameState, Vector2D } from "./types.ts";

const isOutOfBounds = (position: Vector2D) => {
  return (
    position.x < 0 ||
    position.x > window.innerWidth ||
    position.y < 0 ||
    position.y > window.innerHeight
  );
};

const removeBullets = (game: GameState) => {
  const idsToRemove: string[] = [];
  for (const bullet of Object.values(game.bullets)) {
    if (isOutOfBounds({ x: bullet.position[0], y: bullet.position[1] })) {
      idsToRemove.push(bullet.id);
    }
  }
  for (const id of idsToRemove) {
    delete game.bullets[id];
  }
};

const removeEnemies = (game: GameState) => {
  const idsToRemove: string[] = [];
  for (const enemy of Object.values(game.enemies)) {
    if (isOutOfBounds({ x: enemy.position[0], y: enemy.position[1] })) {
      idsToRemove.push(enemy.id);
    }
  }
  for (const id of idsToRemove) {
    delete game.enemies[id];
  }
};

const purgeOutOfBounds = (game: GameState) => {
  removeBullets(game);
  removeEnemies(game);
};
export default purgeOutOfBounds;
