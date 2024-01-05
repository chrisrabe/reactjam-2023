import { Dimensions } from "../../logic/types.ts";

export interface ScaleContextValue {
  gameToClient: Dimensions;
  clientToGame: Dimensions;
}
