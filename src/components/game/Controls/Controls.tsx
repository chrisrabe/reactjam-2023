import React, {useEffect, useRef} from "react";
import {LEFT_PRESSED, RIGHT_PRESSED, TAPPED} from "../../../config/events.ts";
import ImageButton from "../../common/ImageButton/ImageButton.tsx";

const TAP_THRESHOLD = 200; // 200 ms
const BUTTON_SIZE = 50

const Controls: React.FC = () => {
  const pointerDownTime = useRef<number>(0)

  const onPointerDown = () => {
    pointerDownTime.current = Date.now()
  }

  const onPointerUp = () => {
    const pointerUpTime = Date.now()
    const duration = pointerUpTime - pointerDownTime.current

    if(duration < TAP_THRESHOLD) {
      console.debug('tap emitted')
      document.dispatchEvent(new Event(TAPPED))
    }
  }

  const onLeftClick = () => {
    console.debug('left click')
    document.dispatchEvent(new Event(LEFT_PRESSED))
  }

  const onRightClick = () => {
    console.debug('right click')
    document.dispatchEvent(new Event(RIGHT_PRESSED))
  }

  useEffect(() => {
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointerup', onPointerUp)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, []);

  return (
    <div style={{
      position: 'absolute',
      bottom: window.innerHeight * 0.10,
      gap: BUTTON_SIZE,
      display: 'flex',
      width: '100vw',
      justifyContent: 'center'
    }}>
      <ImageButton onClick={onLeftClick} image="assets/ui/left_button.svg" width={BUTTON_SIZE} height={BUTTON_SIZE}/>
      <ImageButton onClick={onRightClick} image="assets/ui/right_button.svg" width={BUTTON_SIZE} height={BUTTON_SIZE}/>
    </div>
  )
};

export default Controls;
