import React from "react";
import {
  OverwatchMarker as Marker,
  PlayerRole,
  Vector2D,
} from "../../../logic/types.ts";
import { Container } from "@pixi/react";
import usePlayerControls from "../../../hooks/usePlayerControls.ts";
import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "pixi.js";

interface OverwatchMarkerProps {
  role: PlayerRole;
  marker: Marker | null;
}

const OverwatchMarker: React.FC<OverwatchMarkerProps> = ({ role, marker }) => {
  const onTap = ({ position }: { position: Vector2D }) => {
    Rune.actions.setOverwatchMarker({
      position,
    });
  };

  usePlayerControls({
    disabled: role !== PlayerRole.Overwatch,
    onTap,
  });

  const draw = (g: PixiGraphics) => {
    if (!marker) return;

    g.clear();
    g.position.set(marker.position.x, marker.position.y);

    g.lineStyle(2, "yellow");

    const lineLength = 25; // Length of each line of the "X"

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
      {marker && <Graphics draw={draw} anchor={0.5} />}
    </Container>
  );
};

export default OverwatchMarker;
