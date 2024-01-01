import { Bullet, GameState, Vector2D } from "./types.ts";

const SHIP_SIZE = 50;
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

const updateRotation = (game: GameState) => {
  if (game.desiredRotation !== null) {
    game.ship.rotation = game.desiredRotation;
    game.desiredRotation = null;
  }
};

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
    shoot: (_, { game }) => {
      const bullet: Bullet = {
        position: [game.ship.position.x, game.ship.position.y],
        rotation: game.ship.rotation,
      };
      game.newBullets.push(bullet);
    },
  },
  update: ({ game }) => {
    updateRotation(game);
    updateBullets(game);
  },
  updatesPerSecond: 30,
});
