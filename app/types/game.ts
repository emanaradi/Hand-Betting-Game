import type { Tile } from "../types/tile";
import type { HonorTileValues } from "../types/tileValues";

export type BetChoice = "higher" | "lower";

export type Gender = "male" | "female";

export interface GameState {
  playerName: string;
  gender: Gender | "";
  currentHand: Tile[];
  currentValue: number;

  previousHand: Tile[];
  previousValue: number;

  score: number;

  honorValues: HonorTileValues;

  gameOver: boolean;
}
