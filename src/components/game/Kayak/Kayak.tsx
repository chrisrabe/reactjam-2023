import React from "react";
import {useEngine} from "../../common/World";
import {Body} from "matter-js";
import usePlayerControls from "../../../hooks/usePlayerControls.ts";
import useRectPhysicsBody from "../../../hooks/usePhysicsBody.ts";
import KayakGraphics from "./KayakGraphics.tsx";

interface KayakProps {
  x: number
  y: number
  width: number
  height: number
  isNPC?: boolean
}

const PADDLE_FORCE_MAGNITUDE = 0.02

const Kayak: React.FC<KayakProps> = ({x, y, width, height, isNPC = false}) => {
  const engine = useEngine();
  const body = useRectPhysicsBody({engine, x, y, width, height})

  const onMoveForward = () => {
    if(!body.current) return
    const b = body.current

    const force = {
      x: Math.sin(b.angle) * PADDLE_FORCE_MAGNITUDE,
      y: Math.cos(b.angle) * PADDLE_FORCE_MAGNITUDE * -1
    }
    Body.applyForce(b, b.position, force)
  }

  const onRotateLeft = () => {
    if(!body.current) return
    Body.setAngularVelocity(body.current, -PADDLE_FORCE_MAGNITUDE)
  }

  const onRotateRight = () => {
    if(!body.current) return
    Body.setAngularVelocity(body.current, PADDLE_FORCE_MAGNITUDE)
  }

  usePlayerControls({
    onRotateLeft,
    onRotateRight,
    onMoveForward,
    disabled: isNPC
  })

  return <KayakGraphics bodyRef={body} width={width} height={height} />
};

export default Kayak;
