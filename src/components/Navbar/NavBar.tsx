"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "../Searchbar/SearchBar";
import FavoritesList from "../Favorites/FavoriteList";
import Image from "next/image";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const dropdownRef = useOutsideClick(() => setShowFavorites(false));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-9999 py-3 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 transition-colors duration-500
    bg-[#000412]
    ${scrolled ? "md:bg-[#000412]" : "md:bg-transparent"}
  `}
    >
      <Link
        href="/"
        className="text-[28px] lg:text-[36px] font-bold text-white cursor-pointer"
      >
        MovieFlex
      </Link>

      <div className="w-full sm:w-[60%] md:w-[50%] max-w-[650px] order-last sm:order-none">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </div>
      <div className="flex gap-8">
        <div>
          <Link
            href="/most-watched"
            className="text-[18px] font-medium text-white cursor-pointer"
          >
            Most watched
          </Link>
        </div>
        <div
          ref={dropdownRef}
          onClick={() => setShowFavorites((prev) => !prev)}
          className="relative flex gap-2 items-center text-white text-[18px] font-medium cursor-pointer"
        >
          Favorites
          <Image
            width={20}
            height={20}
            src="/images/filled-star.png"
            alt="star"
          />
          {showFavorites && <FavoritesList />}
        </div>
      </div>
    </nav>
  );
}
