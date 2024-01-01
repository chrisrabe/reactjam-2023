import { GameState } from "./types.ts";

const SHIP_SIZE = 50;

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (): GameState => {
    return {
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
      game.ship.rotation += rotationSpeed;
    },
  },
  updatesPerSecond: 30,
});
