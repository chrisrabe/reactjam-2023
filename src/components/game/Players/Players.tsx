import React from "react";
import {Container} from "@pixi/react";
import Kayak from "../Kayak";

const Players: React.FC = () => {
  return (
    <Container name="players">
      <Kayak x={window.innerWidth / 2} y={window.innerHeight / 2} width={25} height={50}/>
    </Container>
  )
};

export default Players;
