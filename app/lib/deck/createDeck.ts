//------------------------DEFINE TILES-----------------------------------
import type { Rank, Tile } from "../../types/tile";
//------------------------CREATE DECK------------------------------------

// export type Suit = "bamboo" | "dots" | "characters" | "wind" | "dragon";

// export interface Tile {
//   id: string;
//   suit: Suit;

//   // for number tiles
//   rank?: number;

//   // wind or dragon only
//   name?: "east" | "south" | "west" | "north" | "red" | "green" | "white";
// }

const NUMBER_SUITS = ["bamboo", "dots", "characters"] as const;

const WINDS = ["east", "south", "west", "north"] as const;

const DRAGONS = ["red", "green", "white"] as const;

export function createDeck(deckNumber = 1): Tile[] {
  const deck: Tile[] = [];

  for (const suit of NUMBER_SUITS) {
    for (let rank = 1; rank <= 9; rank++) {
      for (let copy = 1; copy <= 4; copy++) {
        deck.push({
          id: `${suit}-${rank}-${copy}`,
          suit,
          rank: rank as Rank,
        });
      }
    }
  }

  for (const wind of WINDS) {
    for (let copy = 1; copy <= 4; copy++) {
      deck.push({
        id: `wind-${wind}-${copy}`,
        suit: "wind",
        name: wind,
      });
    }
  }

  for (const dragon of DRAGONS) {
    for (let copy = 1; copy <= 4; copy++) {
      deck.push({
        id: `dragon-${dragon}-${copy}`,
        suit: "dragon",
        name: dragon,
      });
    }
  }

  return deck;
}
