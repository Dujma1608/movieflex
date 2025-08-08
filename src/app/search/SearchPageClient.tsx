"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import Image from "next/image";
import { MovieListItem } from "../models/Movie";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import MoviePoster from "../movie/[movieId]/MoviePoster";

interface SearchPageClientProps {
  query: string | null;
}

function SearchPageClient({ query }: SearchPageClientProps) {
  const { movieStore } = useStore();
  const { getSearchedMovies, searchMovies, totalResults, loading } = movieStore;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const hasMore = searchMovies.length < totalResults;

  useInfiniteScroll({
    targetRef: observerRef,
    hasMore,
    loading,
    onLoadMore: () => {
      if (query) getSearchedMovies(query, movieStore.currentPage + 1);
    },
  });

  useEffect(() => {
    if (!query) return;

    getSearchedMovies(query, 1);
  }, [query]);

  if (!query) return <p>No query provided.</p>;

  return (
    <div className="pt-48 sm:pt-40 lg:pt-24 px-8">
      <p>{totalResults} results</p>
      <h1 className="text-3xl font-bold mb-4">
        Results for: <span className="text-blue-400">{`"${query}"`}</span>
      </h1>

      <ul className="flex flex-col gap-5 justify-start">
        {searchMovies.map((movie: MovieListItem) => (
          <li key={movie.id}>
            <div className="flex h-60 md:h-70 lg:h-80 rounded shadow transition border-b-2 border-white/10 pb-4">
              <MoviePoster
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                release_date={movie.release_date}
              />
              <Link className="w-full h-full" href={`/movie/${movie.id}`}>
                <div className="p-2 ml-4 text-white w-full">
                  <h2 className="font-semibold text-xl">
                    {movie.title}{" "}
                    <span className="text-white/50 font-normal">
                      ({movie.release_date?.split("-")[0] ?? "Unknown"})
                    </span>
                  </h2>
                  <p className="text-white/60">Score: {movie.vote_average}</p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {loading && <p className="text-center mt-4">Loading...</p>}

      {hasMore && <div ref={observerRef} className="h-120" />}
    </div>
  );
}

export default observer(SearchPageClient);
