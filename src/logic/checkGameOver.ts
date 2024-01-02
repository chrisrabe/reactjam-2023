import { GameStage, GameState } from "./types.ts";

const checkGameOver = (game: GameState) => {
  const shipPosition = game.ship.position;
  const collisionThreshold = game.ship.size / 2;

  for (const enemy of Object.values(game.enemies)) {
    // if enemy.position collides with shipPosition, invoke Rune.gameOver
    const dx = shipPosition.x - enemy.position[0];
    const dy = shipPosition.y - enemy.position[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < collisionThreshold + enemy.size / 2) {
      game.stage = GameStage.GameOver;
      Rune.gameOver();
      break;
    }
  }
};

export default checkGameOver;
