import type { Tile } from "~/types/tile";

interface HandProps {
  hand: Tile[];
}

export default function Hand({ hand }: HandProps) {
  return (
    <>
      {hand.map((tile) => (
        <div
          key={tile.id}
          className="flex flex-row justify-between items-center gap-5 w-full"
        >
          <p>previous hand</p>
          <p>value: 0</p>
        </div>
      ))}
    </>
  );
}
