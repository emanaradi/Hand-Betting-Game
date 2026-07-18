import type { Tile } from "~/types/tile";
import { motion } from "framer-motion";

interface TileCardProps {
  tile: Tile;
  className?: string;
}

export default function TileCard({ tile, className }: TileCardProps) {
  const name = tile.id.split("-")[1];
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">
        <img
          src={`/${getTileImage(tile)}.svg`}
          alt={`${tile.id}`}
          className={className}
        />
        <small>
          {name} {tile.suit}
        </small>
      </div>
    </>
  );
}

function getTileImage(tile: Tile) {
  if (
    tile.suit === "bamboo" ||
    tile.suit === "dots" ||
    tile.suit === "characters"
  ) {
    return `${tile.suit}-${tile.rank}`;
  }

  if (tile.suit === "wind") {
    return `wind-${tile.name}`;
  }

  if (tile.suit === "dragon") {
    return `dragon-${tile.name}`;
  }
}
