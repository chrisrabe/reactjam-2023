import {useEffect, useRef} from "react";
import {Bodies, Engine, Composite, Body} from "matter-js";

interface RectPhysicsBodyProps {
  engine: Engine | null
  x: number
  y: number
  width: number
  height: number
}

const useRectPhysicsBody = ({engine, x, y, width, height}: RectPhysicsBodyProps) => {
  const bodyRef = useRef<Body>();

  useEffect(() => {
    if (!engine) return;

    const body = Bodies.rectangle(x, y, width, height, {
      friction: 0.02,
      frictionAir: 0.02,
      density: 0.01
    });

    Composite.add(engine.world, body);
    bodyRef.current = body;
  }, [engine, x, y, width, height]);

  return bodyRef;
};

export default useRectPhysicsBody
