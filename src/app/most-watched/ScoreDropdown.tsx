import { useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Slider from "rc-slider";
import Image from "next/image";

interface Props {
  scoreFilter: number | undefined;
  setScoreFilter: (year: number) => void;
}

export default function ScoreDropdown({ scoreFilter, setScoreFilter }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [showScoreDropdown, setShowScoreDropdown] = useState(false);
  const [tempScore, setTempScore] = useState<number>(scoreFilter ?? 5);

  const dropdownRef = useOutsideClick(() => {
    if (!isDragging) {
      setShowScoreDropdown(false);
    }
  });

  return (
    <div
      ref={dropdownRef}
      onClick={() => setShowScoreDropdown((prev) => !prev)}
      className="relative flex items-center gap-2 cursor-pointer border-2 p-1 border-white/60 w-fit min-w-[100px]"
    >
      <p className="text-[15px] lg:text-[18px] pl-1 text-white/60 font-semibold">
        Score
      </p>
      <Image
        className={`${
          showScoreDropdown ? "rotate-180" : ""
        } transform transition duration-200`}
        width={30}
        height={30}
        src="/icons/arrow-down.svg"
        alt="arrow-down"
      />
      {showScoreDropdown && (
        <div className="absolute z-10 top-12 -left-45 lg:left-0 pb-8 pt-4 lg:pb-8 lg:pt-6 px-6 overflow-y-auto bg-[#10161d] cursor-default w-max">
          <div className="flex flex-col gap-3 lg:gap-5 w-[260px]">
            <div className="flex items-baseline gap-5 justify-center">
              <p className="text-white/80 text-md mb-4 text-center">
                Selected score:
              </p>
              <span className="w-10 bg-white/80 p-1 text-center rounded-[10px] text-[16px] lg:text-[18px] text-black font-bold">
                {tempScore}
              </span>
            </div>

            <Slider
              min={0}
              max={10}
              value={tempScore}
              onChange={(val) => {
                setIsDragging(true);
                setTempScore(val as number);
              }}
              onChangeComplete={(val) => {
                setIsDragging(false);
                setScoreFilter(val as number);
              }}
              step={0.1}
              marks={yearMarks}
              styles={{
                rail: { backgroundColor: "#bbbbbb", height: 6 },
                track: { backgroundColor: "#888", height: 6 },
                handle: {
                  backgroundColor: "#bbbbbb",
                  height: 20,
                  width: 20,
                  marginTop: -6,
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const yearMarks = {
  0: (
    <p
      style={{
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(255, 255, 255, 0.8)",
      }}
    >
      0
    </p>
  ),
  10: (
    <p
      style={{
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(255, 255, 255, 0.8)",
      }}
    >
      10
    </p>
  ),
};
