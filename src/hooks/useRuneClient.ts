import { useEffect } from "react";
import { GAME_STATE_CHANGED } from "../utils/events.ts";

const useRuneClient = () => {
  useEffect(() => {
    Rune.initClient({
      onChange: (params) => {
        document.dispatchEvent(
          new CustomEvent(GAME_STATE_CHANGED, { detail: params }),
        );
      },
    });
  }, []);
};

export default useRuneClient;
