import { GameState, Vector2D } from "./types.ts";
import { ENEMY_SPEED } from "./constants.ts";

const moveEnemies = (game: GameState) => {
  const enemySpeed = ENEMY_SPEED;
  const shipPosition = game.ship.position;

  for (const enemy of Object.values(game.enemies)) {
    const enemyPosition: Vector2D = {
      x: enemy.position[0],
      y: enemy.position[1],
    };

    // Get direction from enemy to ship
    const direction = getDirection(enemyPosition, shipPosition);

    // Update enemy position
    enemy.position[0] += direction.x * enemySpeed;
    enemy.position[1] += direction.y * enemySpeed;
  }
};

const getDirection = (from: Vector2D, to: Vector2D): Vector2D => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy) || 1;

  return {
    x: dx / distance,
    y: dy / distance,
  };
};

export default moveEnemies;
