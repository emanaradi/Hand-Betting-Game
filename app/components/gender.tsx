import type { Gender } from "~/types/game";

interface GenderProps {
  gender: Gender;
}

export default function Gender({ gender }: GenderProps) {
  return (
    <>
      {gender == "female" ? (
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/external-chinese-chinese-new-year-kmg-design-flat-kmg-design-3.png"
          alt="external-chinese-chinese-new-year-kmg-design-flat-kmg-design-3"
        />
      ) : (
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/external-chinese-chinese-new-year-kmg-design-flat-kmg-design-2.png"
          alt="external-chinese-chinese-new-year-kmg-design-flat-kmg-design-2"
        />
      )}
    </>
  );
}
