// handles initial deck, shuffling draw pile, draws tiles, store discarded tiles, detect when the pile is empty, and reshuffles

import type { Tile } from "../../types/tile";
import { createDeck } from "../deck/createDeck";
import { shuffleDeck } from "../deck/shuffle";
import { drawTiles } from "../deck/draw";

// defining a class because it needs to remember the state

export class DeckManager {
  private drawPile: Tile[];
  private discardPile: Tile[];

  private deckNumber: number;
  private reshuffleCount: number;

  constructor() {
    this.deckNumber = 1;
    this.reshuffleCount = 0;

    this.drawPile = shuffleDeck(createDeck(this.deckNumber));

    this.discardPile = [];
  }

  draw(amount: number): Tile[] {
    if (this.drawPile.length == 0) {
      this.reshuffle();
    }
    const result = drawTiles(this.drawPile, amount);
    this.drawPile = result.remainingPile;
    return result.drawnTiles;
  }

  discard(tiles: Tile[]) {
    this.discardPile.push(...tiles);
  }
  
  private reshuffle() {
    this.reshuffleCount++;
    const freshDeck = createDeck(this.deckNumber + 1);
    this.deckNumber++;

    this.drawPile = shuffleDeck([...freshDeck, ...this.discardPile]);

    this.discardPile = [];
  }

  getDrawPileCount(): number {
    return this.drawPile.length;
  }

  getDiscardedPileCount(): number {
    return this.discardPile.length;
  }

  hasReachedShuffleLimit(): boolean {
    return this.reshuffleCount >= 3;
  }
}
