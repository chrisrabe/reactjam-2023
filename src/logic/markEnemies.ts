import { GameState } from "./types.ts";

const markEnemies = (game: GameState) => {
  if (!game.overwatchMarker) return;

  const marker = game.overwatchMarker;
  const markerSize = 15;

  for (const enemy of Object.values(game.enemies)) {
    const dx = marker.position.x - enemy.position[0];
    const dy = marker.position.y - enemy.position[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const combinedSize = markerSize / 2 + enemy.size / 2;

    if (distance < combinedSize) {
      enemy.isVisible = true;
    }
  }

  game.overwatchMarker = null;
};

export default markEnemies;
