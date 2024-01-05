import { Dimensions } from "../../logic/types.ts";
import React, { createContext, ReactNode } from "react";

export interface ScaleContextValue {
  gameToClient: Dimensions;
  clientToGame: Dimensions;
}

const DEFAULT_SCALE: Dimensions = { width: 1, height: 1 };

export const ScaleContext = createContext<ScaleContextValue>({
  gameToClient: DEFAULT_SCALE,
  clientToGame: DEFAULT_SCALE,
});

interface ScaleProviderProps {
  value: ScaleContextValue;
  children: ReactNode;
}

const ScaleProvider: React.FC<ScaleProviderProps> = ({ value, children }) => (
  <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
);

export default ScaleProvider;
