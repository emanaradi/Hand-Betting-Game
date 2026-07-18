import Crown from "~/components/crown";

interface LeaderboardProps {
  rank: 1 | 2 | 3 | 4 | 5;
  score: number;
  name: string;
}

export default function Leaderboard({ rank, score, name }: LeaderboardProps) {
  return (
    <>
      <div className="bg-[#17141A]/50 border rounded-full border-[#BE709A]/50 flex flex-row gap-5 w-150 h-16 justify-between items-center p-8 text-[#F6F6F3]/60 font-roboto text-md">
        <div className="flex gap-20 items-center">
          {rank > 1 && <p>{rank}.</p>}
          {rank === 1 && <Crown />}
          <p>{name}</p>
        </div>
        <p>{score}</p>
      </div>
    </>
  );
}
