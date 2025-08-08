"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";
import Image from "next/image";
import SearchResultItem from "./SearchResultItem";

function SearchBar() {
  const { movieStore } = useStore();
  const { getSearchedResults, searchResults, clearSearch } = movieStore;

  const [query, setQuery] = useState("");
  const [showSearches, setShowSearches] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const dropdownRef = useOutsideClick(() => {
    setShowSearches(false);
  });

  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const queryCheck = query.length > 2;

  useEffect(() => {
    if (!queryCheck) {
      clearSearch();
      setSelectedIndex(-1);
      return;
    }

    const timeout = setTimeout(async () => {
      await getSearchedResults(query);
      setShowSearches(true);
      setSelectedIndex(-1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (selectedIndex < 0 || !itemsRef.current[selectedIndex]) return;

    const el = itemsRef.current[selectedIndex];
    if (el && listRef.current) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        const selectedMovie = searchResults[selectedIndex];
        setShowSearches(false);
        router.push(`/movie/${selectedMovie.id}`);
      } else {
        handleSearchIconClicked();
        setShowSearches(false);
      }
    }
  };

  const handleSearchIconClicked = () => {
    router.push(`/search?q=${query}`);
    setShowSearches(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`flex items-center w-full px-2 pt-2 pb-1 sm:pb-4 ${
          showSearches && "bg-[#10161d] rounded-t-[10px]"
        }`}
      >
        <input
          className="relative bg-gray-800 px-5 text-[16px] lg:text-[18px] py-1.5 w-full rounded-[20px] outline-none"
          type="text"
          value={query}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (queryCheck) setShowSearches(true);
          }}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
        />
        <Image
          onClick={handleSearchIconClicked}
          width={24}
          height={24}
          className="absolute right-5 flex lg:hidden"
          src="/images/search.png"
          alt="search"
        />
      </div>
      {showSearches && (
        <div
          ref={listRef}
          className="absolute top-15 z-150 left-0 w-full bg-[#10161d] rounded-b-[10px] max-h-100 overflow-y-auto shadow-md"
          role="listbox"
        >
          {searchResults.length > 0 &&
            searchResults.map((movie, index) => (
              <SearchResultItem
                key={movie.id}
                movie={movie}
                index={index}
                selectedIndex={selectedIndex}
                setShowSearches={setShowSearches}
                setSelectedIndex={setSelectedIndex}
                itemRef={(el) => {
                  itemsRef.current[index] = el;
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}
export default observer(SearchBar);
