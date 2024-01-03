import React, { useEffect, useRef } from "react";
import { GameStage } from "../../../logic/types.ts";

interface ReadyButtonProps {
  color: string;
  numReady: number;
  isReady: boolean;
  stage: GameStage;
  disabled?: boolean;
}

const NUM_PLAYERS_REQUIRED = 2;

const ReadyButton: React.FC<ReadyButtonProps> = ({
  color,
  numReady,
  isReady,
  disabled,
  stage,
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
        width: "80%",
        fontSize: "1.5rem",
        fontWeight: "bold",
        borderRadius: 20,
        gap: 5,
        display: "flex",
        justifyContent: "center",
      }}
      disabled={disabled || stage === GameStage.Starting}
      onClick={() => Rune.actions.toggleReady()}
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
