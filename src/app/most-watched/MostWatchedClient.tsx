// app/most-watched/MostWatchedClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import MoviePoster from "../movie/[movieId]/MoviePoster";
import { getDiscoverMovies } from "@/lib/tmdb";
import GenreDropdown from "./GenreDropdown";
import ReleaseYearDropdown from "./ReleaseYearDropdown";
import ScoreDropdown from "./ScoreDropdown";
import { MovieListItem } from "../models/Movie";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import Image from "next/image";

export default function MostWatchedClient() {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [genresFilter, setGenresFilter] = useState<number[]>([]);
  const [releaseYearFilter, setReleaseYearFilter] = useState<
    number | undefined
  >();
  const [scoreFilter, setScoreFilter] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    hasMore,
    loading,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const res = await getDiscoverMovies(
          page,
          genresFilter,
          releaseYearFilter,
          scoreFilter
        );
        setMovies((prev) => {
          const allMovies = [...prev, ...res.results];
          return allMovies.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );
        });

        setTotalCount(res.total_results);
        setHasMore(res.results.length > 0);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page, genresFilter, releaseYearFilter, scoreFilter]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [genresFilter, releaseYearFilter, scoreFilter]);

  const handleResetFilters = () => {
    setGenresFilter([]);
    setScoreFilter(undefined);
    setReleaseYearFilter(undefined);
  };

  return (
    <div className="min-h-screen mt-25 sm:mt-0 px-4 lg:px-12 py-25 bg-[#060d17]">
      <h1 className="text-xl font-bold mb-3">Most Watched</h1>
      <p className="text-white/70 mb-4">
        Check out the most-watched movies right now. Updated regularly based on
        popularity and views.
      </p>
      <div className="flex flex-wrap items-center gap-4 whitespace-nowrap hide-scrollbar">
        <p className="text-[18px] min-w-34 font-medium">{totalCount} results</p>
        <GenreDropdown
          genresFilter={genresFilter}
          setGenresFilter={setGenresFilter}
        />
        <ReleaseYearDropdown
          yearFilter={releaseYearFilter}
          setYearFilter={setReleaseYearFilter}
        />
        <ScoreDropdown
          scoreFilter={scoreFilter}
          setScoreFilter={setScoreFilter}
        />
        <button
          className="flex gap-2 items-center p-2 hover:bg-white/10 cursor-pointer"
          onClick={handleResetFilters}
        >
          <Image src="/images/reset.png" alt="reset" width={25} height={25} />
          <p className="text-[18px]  text-white/40 font-semibold ">RESET</p>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xxl:grid-cols-8 gap-5 mt-6">
        {movies.map((movie) => (
          <MoviePoster
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}

      {hasMore && <div ref={observerRef} className="h-120" />}
    </div>
  );
}
