import { GameState } from "./types.ts";

const updateRotation = (game: GameState) => {
  if (game.desiredRotation !== null) {
    game.ship.rotation = game.desiredRotation;
    game.desiredRotation = null;
  }
};

export default updateRotation;
