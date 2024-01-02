import { useEffect } from "react";
import { GAME_STATE_CHANGED } from "../utils/events.ts";
import { GameState } from "../logic/types.ts";

export interface ChangeParams {
  game: GameState;
  futureGame?: GameState;
  yourPlayerId?: string;
}

interface GameStateListener {
  onGameStateChange: (params: ChangeParams) => void;
}

const useGameStateListener = ({ onGameStateChange }: GameStateListener) => {
  const onChange = (event: Event) => {
    const e = event as CustomEvent;
    onGameStateChange(e.detail);
  };

  useEffect(() => {
    document.addEventListener(GAME_STATE_CHANGED, onChange);

    return () => {
      document.removeEventListener(GAME_STATE_CHANGED, onChange);
    };
  }, []);
};

export default useGameStateListener;
