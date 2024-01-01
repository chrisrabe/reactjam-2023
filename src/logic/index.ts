import { GameState } from "./types.ts";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (): GameState => {
    return { count: 0 };
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
  },
});
