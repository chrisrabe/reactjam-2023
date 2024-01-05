import { Bullet, Enemy, GameState } from "./types.ts";
import { ENEMY_REWARD_POINTS } from "./constants.ts";

const updateScore = (game: GameState) => {
  const bullets: Record<string, Bullet> = game.bullets;
  const enemies: Record<string, Enemy> = game.enemies;

  const bulletsToRemove = new Set<string>();
  const enemiesToRemove = new Set<string>();
  let coordinatedAttacks = 0;

  Object.entries(bullets).forEach(([bulletId, bullet]) => {
    if (bulletsToRemove.has(bulletId)) return; // Skip if bullet is already marked for removal

    Object.entries(enemies).forEach(([enemyId, enemy]) => {
      if (enemiesToRemove.has(enemyId)) return; // Skip if enemy is already marked for removal

      // Check for collision
      const dx = bullet.position[0] - enemy.position[0];
      const dy = bullet.position[1] - enemy.position[1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bullet.size / 2 + enemy.size / 2) {
        bulletsToRemove.add(bulletId);
        enemiesToRemove.add(enemyId);
        if (enemy.isVisible) coordinatedAttacks++;
      }
    });
  });

  game.score +=
    enemiesToRemove.size * ENEMY_REWARD_POINTS +
    coordinatedAttacks * ENEMY_REWARD_POINTS;

  // Delete collided bullets and enemies
  bulletsToRemove.forEach((bulletId) => {
    delete game.bullets[bulletId];
  });
  enemiesToRemove.forEach((enemyId) => {
    delete game.enemies[enemyId];
  });
};

export default updateScore;
