import { Bullet, GameStage, GameState, Player, PlayerRole } from "./types.ts";
import updateBullets from "./updateBullets.ts";
import updateRotation from "./updateRotation.ts";
import purgeOutOfBounds from "./purgeOutOfBounds.ts";
import moveEnemies from "./moveEnemies.ts";
import checkGameOver from "./checkGameOver.ts";
import {
  BULLET_SIZE,
  ENEMY_SIZE,
  SHIP_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
} from "./constants.ts";
import updateScore from "./updateScore.ts";
import markEnemies from "./markEnemies.ts";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
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
      dimensions: {
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
      },
      desiredRotation: null,
      overwatchMarker: null,
      stage: GameStage.Preparing,
      newBullets: [],
      ship: {
        position: {
          x: GAME_WIDTH / 2,
          y: GAME_HEIGHT / 2 - SHIP_SIZE / 2,
        },
        rotation: 0,
        size: SHIP_SIZE,
      },
      bullets: {},
      enemies: {},
    };
  },
  actions: {
    setRotation: (rotation, { game }) => {
      game.desiredRotation = rotation;
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
        isVisible: false,
      };
    },
    setRole: (role, { game, playerId }) => {
      game.players[playerId].role = role;
    },
    toggleReady: (_, { game, playerId }) => {
      game.players[playerId].isReady = !game.players[playerId].isReady;
    },
    setStage: (stage, { game }) => {
      game.stage = stage;
    },
    setOverwatchMarker: (marker, { game }) => {
      game.overwatchMarker = marker;
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
    markEnemies(game);
    moveEnemies(game);
    updateScore(game);
    purgeOutOfBounds(game);
    checkGameOver(game);
  },
  updatesPerSecond: 30,
});
