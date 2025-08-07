// components/SearchResultItem.tsx

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MovieListItem } from "@/app/models/Movie";

interface SearchResultItemProps {
  movie: MovieListItem;
  index: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  itemRef: (el: HTMLDivElement | null) => void;
}

export default function SearchResultItem({
  movie,
  index,
  selectedIndex,
  setSelectedIndex,
  itemRef,
}: SearchResultItemProps) {
  const router = useRouter();

  return (
    <div
      id={`movie-item-${index}`}
      ref={itemRef}
      className={`px-4 py-2 border-b border-gray-700 text-white cursor-pointer hover:bg-gray-700 ${
        index === selectedIndex ? "bg-gray-700" : ""
      }`}
      role="option"
      aria-selected={index === selectedIndex}
      onMouseEnter={() => setSelectedIndex(index)}
      onClick={() => router.push(`/movie/${movie.id}`)}
    >
      <div className="flex gap-4 p-2">
        <img
          width={70}
          height={100}
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
        <div className="flex flex-col items-start gap-3">
          <p className="text-[14px] text-white font-semibold text-left">
            {movie.title}
          </p>
          <p className="text-[14px] text-white/70 text-sm">
            ({movie.release_date.split("-")[0]})
          </p>
        </div>
      </div>
    </div>
  );
}
