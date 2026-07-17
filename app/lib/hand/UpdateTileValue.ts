import type { Tile } from "../../types/tile";
import type { HonorTileValues } from "../../types/tileValues";

export function updateTileValues(
  hand: Tile[],
  honorValues: HonorTileValues,
  won: boolean,
): HonorTileValues {
  const updatedValues = { ...honorValues };

  for (const tile of hand) {
    if (tile.suit == "wind" || tile.suit == "dragon") {
      updatedValues[tile.name] += won ? 1 : -1;
    }
  }

  return updatedValues;
}
