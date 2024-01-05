import React, { useEffect, useRef, useState } from "react";
import {
  OverwatchMarker as Marker,
  PlayerRole,
  Vector2D,
} from "../../../logic/types.ts";
import { Container } from "@pixi/react";
import usePlayerControls from "../../../hooks/usePlayerControls.ts";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";
import { playSound } from "../../../sounds.ts";
import { ScaleContextValue } from "../../../common/ScaleProvider/ScaleProvider.tsx";

interface OverwatchMarkerProps {
  role: PlayerRole;
  marker: Marker | null;
  scaleContext: ScaleContextValue;
}

const MARKER_DURATION = 250;

const OverwatchMarker: React.FC<OverwatchMarkerProps> = ({
  role,
  marker,
  scaleContext,
}) => {
  const scaleContextRef = useRef<ScaleContextValue>(scaleContext); // this keeps scale in graphics redraw updated in real-time
  const removeMarker = useRef<NodeJS.Timeout>();
  const [isVisible, setIsVisible] = useState(marker !== null);

  useEffect(() => {
    if (removeMarker.current) clearTimeout(removeMarker.current);
    if (marker) {
      setIsVisible(true);
    } else {
      removeMarker.current = setTimeout(
        () => setIsVisible(false),
        MARKER_DURATION,
      );
    }
  }, [marker]);

  useEffect(() => {
    scaleContextRef.current = scaleContext;
  }, [scaleContext]);

  const onTap = ({ position }: { position: Vector2D }) => {
    playSound("ping", { once: true });
    const { clientToGame } = scaleContextRef.current;

    const gamePos = {
      x: position.x * clientToGame.width,
      y: position.y * clientToGame.height,
    };

    Rune.actions.setOverwatchMarker({
      position: gamePos,
    });
  };

  usePlayerControls({
    disabled: role !== PlayerRole.Overwatch,
    onTap,
  });

  const draw = (g: PixiGraphics) => {
    if (!marker) return;

    const { gameToClient } = scaleContextRef.current;

    const clientPos = {
      x: marker.position.x * gameToClient.width,
      y: marker.position.y * gameToClient.height,
    };

    g.clear();
    g.position.set(clientPos.x, clientPos.y);

    g.lineStyle(2, "yellow");

    const lineLength = 25;

    // Draw first line of the "X"
    g.moveTo(-lineLength / 2, -lineLength / 2);
    g.lineTo(lineLength / 2, lineLength / 2);

    // Draw second line of the "X"
    g.moveTo(lineLength / 2, -lineLength / 2);
    g.lineTo(-lineLength / 2, lineLength / 2);

    // Draw circle
    g.drawCircle(0, 0, lineLength / 2);

    g.endFill();
  };

  return (
    <Container name="marker">
      {isVisible && <Graphics draw={draw} anchor={0.5} />}
    </Container>
  );
};

export default OverwatchMarker;
