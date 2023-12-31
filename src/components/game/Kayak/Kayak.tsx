import React, {useEffect, useRef} from "react";
import {useEngine} from "../../common/World";
import {Bodies, Body, Composite} from "matter-js";
import {Graphics as PixiGraphics} from "pixi.js";
import {Graphics, useTick} from "@pixi/react";
import {CODE_A, CODE_D} from "keycode-js";
import {LEFT_PRESSED, RIGHT_PRESSED, TAPPED} from "../../../config/events.ts";

interface KayakProps {
  x: number
  y: number
  width: number
  height: number
}

const PADDLE_FORCE_MAGNITUDE = 0.02

const Kayak: React.FC<KayakProps> = ({x, y, width, height}) => {
  const engine = useEngine();
  const body = useRef<Body>()
  const graphics = useRef<PixiGraphics>(null)
  const keyPressed = useRef<Record<string, boolean>>({})

  const draw = (g: PixiGraphics, b: Body) => {
    g.clear();

    // Set the position and rotation of the PIXI graphics to match the body
    g.position.set(b.position.x, b.position.y);
    g.rotation = b.angle; // Match the rotation of the body

    // Draw the ellipse
    // Assuming 'width' and 'height' are defined elsewhere in your scope
    g.beginFill(0xffff00); // Using numeric color for PIXI
    g.drawEllipse(0, 0, width / 2, height /2); // Draw ellipse at origin
    g.endFill();

  }

  const moveForward = (b: Body) => {
    const force = {
      x: Math.sin(b.angle) * PADDLE_FORCE_MAGNITUDE,
      y: Math.cos(b.angle) * PADDLE_FORCE_MAGNITUDE * -1
    }
    Body.applyForce(b, b.position, force)
  }

  const rotateLeft = () => {
    if(!body.current) return
    Body.setAngularVelocity(body.current, -PADDLE_FORCE_MAGNITUDE)
  }

  const rotateRight = () => {
    if(!body.current) return
    Body.setAngularVelocity(body.current, PADDLE_FORCE_MAGNITUDE)
  }

  const rotateFromKeyboard = () => {
    if(keyPressed.current[CODE_D]) {
      rotateRight()
    }
    if(keyPressed.current[CODE_A]) {
      rotateLeft()
    }
  }

  useTick( ()=> {
    const g = graphics.current
    const b = body.current

    if(!g || !b) return

    rotateFromKeyboard()
    draw(g, b)
  })

  useEffect(() => {
    if (!engine) return

    body.current = Bodies.rectangle(x, y, width, height, {
      friction: 0.02,
      frictionAir: 0.02,
      density: 0.01
    })

    Composite.add(engine.world, body.current)
  }, [engine, height, width, x, y]);

  const onKeyDown = (event: KeyboardEvent) => {
    keyPressed.current[event.code] = true
  }

  const onKeyUp = (event: KeyboardEvent) => {
    keyPressed.current[event.code] = false
  }

  const onTap = () => {
    if(!body.current) return
    moveForward(body.current)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener(TAPPED, onTap)
    document.addEventListener(LEFT_PRESSED, rotateLeft)
    document.addEventListener(RIGHT_PRESSED, rotateRight)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener(TAPPED, onTap)
    }
  }, []);

  return <Graphics ref={graphics} />
};

export default Kayak;
