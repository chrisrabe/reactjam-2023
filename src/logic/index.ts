import { GameState } from "./types.ts";

const SHIP_SIZE = 50;

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (): GameState => {
    return {
      desiredRotation: null,
      ship: {
        position: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2 - SHIP_SIZE / 2,
        },
        rotation: 0,
        size: SHIP_SIZE,
      },
    };
  },
  actions: {
    rotate: (rotationSpeed, { game }) => {
      game.desiredRotation = game.ship.rotation + rotationSpeed;
    },
  },
  update: ({ game }) => {
    if (game.desiredRotation !== null) {
      game.ship.rotation = game.desiredRotation;
      game.desiredRotation = null;
    }
  },
  updatesPerSecond: 30,
});
