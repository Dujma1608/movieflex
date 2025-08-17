"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Image from "next/image";

interface Props {
  yearFilter: number | undefined;
  setYearFilter: (year: number) => void;
}

export default function ReleaseYearDropdown({
  yearFilter,
  setYearFilter,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [tempYear, setTempYear] = useState<number>(yearFilter ?? 2025);

  const dropdownRef = useOutsideClick(() => {
    if (!isDragging) {
      setShowYearDropdown(false);
    }
  });

  useEffect(() => {
    setTempYear(yearFilter ?? 2025);
  }, [yearFilter]);

  return (
    <div
      className="relative w-fit"
      ref={dropdownRef}
      onClick={() => {
        if (!isDragging) setShowYearDropdown((prev) => !prev);
      }}
    >
      <div className="flex items-center gap-2 cursor-pointer border-2 p-1 border-white/60 min-w-[160px] w-fit">
        <p className="text-[15px] lg:text-[18px] pl-1 text-white/60 font-semibold">
          Release year
        </p>
        <Image
          className={`${
            showYearDropdown ? "rotate-180" : ""
          } transform transition duration-200`}
          width={30}
          height={30}
          src="/icons/arrow-down.svg"
          alt="arrow-down"
        />
      </div>

      {showYearDropdown && (
        <div className="absolute z-10 top-full mt-2 left-0 pb-8 pt-4 lg:pb-8 lg:pt-6 px-6 bg-[#10161d] w-max">
          <div className="flex flex-col gap-3 lg:gap-5 w-[260px]">
            <div className="flex items-baseline gap-5 justify-center">
              <p className="text-white/80 text-md mb-4 text-center">
                Selected year:
              </p>
              <span className="bg-white/80 p-1 text-center rounded-[10px] text-[16px] lg:text-[18px] text-black font-bold">
                {tempYear}
              </span>
            </div>
            <Slider
              min={1950}
              max={2025}
              value={tempYear}
              onChange={(val) => {
                setIsDragging(true);
                setTempYear(val as number);
              }}
              onChangeComplete={(val) => {
                setIsDragging(false);
                setYearFilter(val as number);
              }}
              step={1}
              marks={yearMarks}
              styles={{
                rail: { backgroundColor: "#888", height: 6 },
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
  1950: (
    <p
      style={{
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(255, 255, 255, 0.8)",
      }}
    >
      1950
    </p>
  ),
  2025: (
    <p
      style={{
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(255, 255, 255, 0.8)",
      }}
    >
      2025
    </p>
  ),
};
