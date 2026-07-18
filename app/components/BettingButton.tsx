interface BettingButtonProps {
  title: string;
  onClick?: () => void;
}

export default function BettingButton({ title, onClick }: BettingButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-[#CB96AB] text-[#2A2531] px-4 py-2 rounded-lg hover:bg-[#F6F6F3] hover:text-[#2A2531] transition-colors duration-300 cursor-pointer hover:scale-110 transition-transform duration-300"
      >
        {title}
      </button>
    </>
  );
}
