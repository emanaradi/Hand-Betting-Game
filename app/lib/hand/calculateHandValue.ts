import type { Tile } from "../../types/tile";
import type { HonorTileValues } from "../../types/tileValues";

export function calculateHandValue(
  hand: Tile[],
  honorValues: HonorTileValues,
): number {
  return hand.reduce((total, tile) => {
    if (
      tile.suit == "bamboo" ||
      tile.suit == "dots" ||
      tile.suit == "characters"
    ) {
      return total + (tile.rank ?? 0);
    }

    if (tile.suit == "wind" || tile.suit == "dragon") {
      return total + honorValues[tile.name];
    }

    return total;
  }, 0);
}
