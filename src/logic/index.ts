import { Bullet, GameState } from "./types.ts";
import updateBullets from "./updateBullets.ts";
import updateRotation from "./updateRotation.ts";
import purgeOutOfBounds from "./purgeOutOfBounds.ts";

const SHIP_SIZE = 50;

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (): GameState => {
    return {
      desiredRotation: null,
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
      };
      game.newBullets.push(bullet);
    },
  },
  update: ({ game }) => {
    updateRotation(game);
    updateBullets(game);
    purgeOutOfBounds(game);
  },
  updatesPerSecond: 30,
});
