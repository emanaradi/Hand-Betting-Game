export type NumberSuit = "bamboo" | "dots" | "characters";

export type HonorSuit = "wind" | "dragon";

export type Suit = NumberSuit | HonorSuit;

export type WindName = "east" | "south" | "west" | "north";

export type DragonName = "red" | "green" | "white";

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface NumberTile {
  id: string;
  suit: NumberSuit;
  rank: Rank;
}

export interface WindTile {
  id: string;
  suit: "wind";
  name: WindName;
}

export interface DragonTile {
  id: string;
  suit: "dragon";
  name: DragonName;
}

export type Tile = NumberTile | WindTile | DragonTile;
