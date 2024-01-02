import { GameState } from "./types.ts";

const spawnEnemies = (game: GameState) => {
  const defaultPos = {
    x: window.innerWidth / 2,
    y: 0,
  };
  const enemy = game.enemiesToSpawn.pop() ?? {
    position: defaultPos,
  };

  game.enemies.push(enemy);
};

export default spawnEnemies;
