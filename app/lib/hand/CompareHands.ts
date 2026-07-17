import type { BetChoice } from "../../types/game";

export function compareHands(
  previousValue: number,
  currentValue: number,
  bet: BetChoice,
): boolean {
  if (bet === "higher") {
    return currentValue > previousValue;
  }

  if (bet === "lower") {
    return currentValue < previousValue;
  }
  return false;
}
