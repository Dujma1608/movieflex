"use client";

import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ScrollableList({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState({ left: false, right: false });

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setShowArrows({
      left: scrollLeft > 0,
      right: scrollLeft + clientWidth < scrollWidth - 5,
    });
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className="relative h-60 lg:h-70 xxl:h-80"
      onMouseEnter={handleScroll}
      onMouseLeave={() => setShowArrows({ left: false, right: false })}
    >
      {showArrows.left && (
        <ScrollArrow
          direction="left"
          onClick={() =>
            containerRef.current?.scrollBy({ left: -400, behavior: "smooth" })
          }
        />
      )}

      <div
        ref={containerRef}
        className="flex items-center gap-5 overflow-x-auto hide-scrollbar h-full"
      >
        {children}
      </div>

      {showArrows.right && (
        <ScrollArrow
          direction="right"
          onClick={() =>
            containerRef.current?.scrollBy({ left: 400, behavior: "smooth" })
          }
        />
      )}
    </div>
  );
}

function ScrollArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      className={`absolute top-0 ${
        direction === "left" ? "left-0" : "right-0"
      } z-10 
        cursor-pointer items-center justify-center h-full w-15 hidden lg:flex`}
      onClick={onClick}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <Image
        src="/images/arrow.png"
        width={35}
        height={35}
        alt={`Scroll ${direction}`}
        className={direction === "left" ? "rotate-180" : ""}
      />
    </button>
  );
}
