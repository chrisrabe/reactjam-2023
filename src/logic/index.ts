import { Bullet, GameStage, GameState, Player, PlayerRole } from "./types.ts";
import updateBullets from "./updateBullets.ts";
import updateRotation from "./updateRotation.ts";
import purgeOutOfBounds from "./purgeOutOfBounds.ts";
import moveEnemies from "./moveEnemies.ts";
import checkGameOver from "./checkGameOver.ts";
import { SHIP_SIZE, BULLET_SIZE, ENEMY_SIZE } from "./constants.ts";
import updateScore from "./updateScore.ts";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    const roles = [PlayerRole.Pilot, PlayerRole.Overwatch];

    return {
      host: allPlayerIds[0],
      players: allPlayerIds.reduce<Record<string, Player>>(
        (a, playerId, idx) => {
          a[playerId] = {
            id: playerId,
            isReady: false,
            role: roles[idx],
          };
          return a;
        },
        {},
      ),
      score: 0,
      desiredRotation: null,
      stage: GameStage.Playing,
      newBullets: [],
      ship: {
        position: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2 - SHIP_SIZE / 2,
        },
        rotation: 0,
        size: SHIP_SIZE,
      },
      bullets: {},
      enemies: {},
    };
  },
  actions: {
    rotate: (rotationSpeed, { game }) => {
      game.desiredRotation = game.ship.rotation + rotationSpeed;
    },
    shoot: (id, { game }) => {
      const bullet: Bullet = {
        id,
        position: [game.ship.position.x, game.ship.position.y],
        rotation: game.ship.rotation,
        size: BULLET_SIZE,
      };
      game.newBullets.push(bullet);
    },
    spawnEnemy: ({ position, id }, { game }) => {
      game.enemies[id] = {
        id,
        position: [position.x, position.y],
        size: ENEMY_SIZE,
      };
    },
  },
  events: {
    playerLeft: (playerId, { game, allPlayerIds }) => {
      if (playerId === game.host) {
        const nextHost = allPlayerIds.find((id) => id !== game.host);
        if (!nextHost) throw Rune.invalidAction();
        game.host = nextHost;
      }
    },
  },
  update: ({ game }) => {
    updateRotation(game);
    updateBullets(game);
    moveEnemies(game);
    updateScore(game);
    purgeOutOfBounds(game);
    checkGameOver(game);
  },
  updatesPerSecond: 30,
});
