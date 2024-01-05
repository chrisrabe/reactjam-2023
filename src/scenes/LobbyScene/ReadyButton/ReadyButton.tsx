import React, { useEffect, useRef } from "react";
import { GameStage } from "../../../logic/types.ts";
import { playSound } from "../../../sounds.ts";

interface ReadyButtonProps {
  color: string;
  numReady: number;
  isReady: boolean;
  stage: GameStage;
  disabled?: boolean;
  scale: number;
}

const NUM_PLAYERS_REQUIRED = 2;

const ReadyButton: React.FC<ReadyButtonProps> = ({
  color,
  numReady,
  isReady,
  disabled,
  stage,
  scale,
}) => {
  const startTrigger = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (startTrigger.current) clearTimeout(startTrigger.current);

    if (numReady === NUM_PLAYERS_REQUIRED) {
      startTrigger.current = setTimeout(() => {
        Rune.actions.setStage(GameStage.Starting);
        setTimeout(() => {
          Rune.actions.setStage(GameStage.Playing);
        }, 1000);
      }, 1000);
    }

    return () => {
      if (startTrigger.current) clearTimeout(startTrigger.current);
    };
  }, [numReady]);

  return (
    <button
      style={{
        border: "none",
        backgroundColor: disabled ? "gray" : color,
        padding: "1rem",
        fontSize: 24,
        fontWeight: "bold",
        borderRadius: 20,
        gap: 5,
        display: "flex",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
      disabled={disabled || stage === GameStage.Starting}
      onClick={() => {
        playSound("beep", { once: true });
        Rune.actions.toggleReady();
      }}
    >
      {stage === GameStage.Preparing && (
        <>
          <span>{isReady ? "Abort" : "Ready Up"}</span>
          <span>({numReady}/2)</span>
        </>
      )}
      {stage === GameStage.Starting && <span>Starting game...</span>}
    </button>
  );
};

export default ReadyButton;
