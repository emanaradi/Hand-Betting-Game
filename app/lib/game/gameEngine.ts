// this manages current hand, prev hand, player score, player bet,
// drawing new hands, checking win/loss, updating honor tile values, and checking game over conditions

import { DeckManager } from "./deckManager";

import type { GameState, BetChoice } from "../../types/game";

import { calculateHandValue } from "../hand/calculateHandValue";
import { compareHands } from "../hand/CompareHands";
import { updateTileValues } from "../hand/UpdateTileValue";
import type { Gender } from "../../types/game";

export class GameEngine {
  private deck: DeckManager;
  private state: GameState;

  constructor() {
    this.deck = new DeckManager();

    this.state = {
      playerName: "",
      gender: "",
      currentHand: [],
      currentValue: 0,
      previousHand: [],
      previousValue: 0,
      score: 0,

      honorValues: {
        east: 5,
        south: 5,
        west: 5,
        north: 5,

        red: 5,
        green: 5,
        white: 5,
      },

      gameOver: false,
    };
  }

  start() {
    const hand = this.deck.draw(3);

    const value = calculateHandValue(hand, this.state.honorValues);

    this.state.currentHand = hand;
    this.state.currentValue = value;
  }

  bet(choice: BetChoice) {
    if (this.state.gameOver) {
      return;
    }

    const oldValue = this.state.currentValue;

    const oldHand = this.state.currentHand;

    const newHand = this.deck.draw(3);

    const newValue = calculateHandValue(newHand, this.state.honorValues);

    const won = compareHands(oldValue, newValue, choice);

    this.state.honorValues = updateTileValues(
      newHand,
      this.state.honorValues,
      won,
    );

    this.state.previousHand = oldHand;
    this.state.previousValue = oldValue;

    this.state.currentHand = newHand;
    this.state.currentValue = newValue;

    this.checkGameOver();
  }

  private checkGameOver() {
    const values = Object.values(this.state.honorValues);

    const invalid = values.some((value) => value >= 10 || value <= 0);

    if (invalid) {
      this.state.gameOver = true;
    }

    if (this.deck.hasReachedShuffleLimit()) {
      this.state.gameOver = true;
    }
  }

  getState(): GameState {
    return { ...this.state };
  }

  setPlayerInfo(name: string, gender: Gender) {
    this.state.playerName = name;
    this.state.gender = gender;
  }
}
