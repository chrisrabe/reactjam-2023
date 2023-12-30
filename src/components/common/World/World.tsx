import React, {createContext, ReactNode, useContext, useState} from "react";
import {Engine} from "matter-js";
import {useTick} from "@pixi/react";

const EngineContext = createContext<Engine | null>(null)
export const useEngine = () => useContext(EngineContext)

interface WorldProps {
  children: ReactNode
}

const World: React.FC<WorldProps> = ({children}) => {
  const [engine] = useState(() => Engine.create());
  useTick(delta => Engine.update(engine, delta * (1000 / 60)))
  return <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>
};

export default World;
