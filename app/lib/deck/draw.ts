import type { Tile } from "../../types/tile";

export function drawTiles(drawPile: Tile[], amount: number) {
  if (amount <= 0) {
    return {
      drawnTiles: [],
      remainingPile: drawPile,
    };
  }

  const actualAmount = Math.min(amount, drawPile.length);

  return {
    drawnTiles: drawPile.slice(0, actualAmount),
    remainingPile: drawPile.slice(actualAmount),
  };
}
