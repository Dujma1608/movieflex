import { useEffect, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import Image from "next/image";

interface Props {
  genresFilter: number[];
  setGenresFilter: (ids: number[]) => void;
}
function GenreDropdown({ genresFilter, setGenresFilter }: Props) {
  const { genreStore } = useStore();
  const { loadGenres, genres } = genreStore;
  const [showGenres, setShowGenres] = useState(false);
  const dropdownRef = useOutsideClick(() => setShowGenres(false));

  useEffect(() => {
    loadGenres();
  }, []);

  const handleClick = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (genresFilter.includes(id)) {
      setGenresFilter(genresFilter.filter((genreId) => genreId !== id));
    } else {
      setGenresFilter([...genresFilter, id]);
    }
  };

  return (
    <div
      aria-haspopup="listbox"
      aria-expanded={showGenres}
      ref={dropdownRef}
      onClick={() => setShowGenres((prev) => !prev)}
      className="relative flex items-center gap-2 cursor-pointer border-2 p-1 border-white/60 min-w-[100px]"
    >
      <p className="text-[15px] lg:text-[18px] pl-1 text-white/60 font-semibold">
        Genre
      </p>
      <Image
        className={`${
          showGenres ? "rotate-180" : ""
        } transform transition duration-200`}
        width={30}
        height={30}
        src="/arrow-down.svg"
        alt="arrow"
      />
      {showGenres && (
        <div className="absolute z-10 top-12 -right-6 lg:left-0 p-4 overflow-y-auto bg-[#10161d] max-w cursor-default w-max">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {genres.map((genre) => (
              <GenreButton
                key={genre.id}
                genreId={genre.id}
                genreName={genre.name}
                isSelected={genresFilter.includes(genre.id)}
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(GenreDropdown);

import React from "react";

interface GenreButtonProps {
  genreId: number;
  genreName: string;
  isSelected: boolean;
  onClick: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

function GenreButton({
  genreId,
  genreName,
  isSelected,
  onClick,
}: GenreButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => onClick(genreId, e)}
      className={`
        font-medium text-[12px] lg:text-[16px] px-3 py-2 cursor-pointer
        ${
          isSelected
            ? "bg-white/80 text-black"
            : "bg-zinc-800 hover:bg-zinc-700 text-white"
        }
      `}
    >
      {genreName}
    </button>
  );
}
