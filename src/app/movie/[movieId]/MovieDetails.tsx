"use client";

import { MovieCredits } from "@/app/models/MovieCredits";
import { MovieDetail } from "@/app/models/MovieDetails";
import { FavoriteMovie } from "@/app/utils/favoriteStorage";
import { useFavorites } from "@/context/FavoriteContext";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MoviePageProps {
  movie: MovieDetail;
  credits: MovieCredits;
}

export default function MovieDetails({ movie, credits }: MoviePageProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  if (!movie) return <div>Loading...</div>;

  const releaseYear = movie.release_date?.split("-")[0] ?? "Unknown";

  const backdropPath =
    movie.belongs_to_collection?.backdrop_path ?? movie.backdrop_path;

  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : null;

  const isFavorited = isFavorite(movie.id);

  const handleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(movie.id);
    } else {
      const favoriteMovie: FavoriteMovie = {
        id: movie.id,
        title: movie.title,
        release_year: releaseYear,
        poster_path: movie.poster_path,
      };
      addToFavorites(favoriteMovie);
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-end pt-35 sm:pt-0 absolute lg:w-2/3 xxl:w-4/5 z-40 right-0 top-0 w-full h-[70%]">
        {backdropUrl && (
          <img src={backdropUrl} alt="backdrop" className="object-cover" />
        )}

        <div
          className="absolute bottom-0 left-0 w-full h-70 lg:h-80"
          style={{
            background:
              "linear-gradient(to top, rgba(10, 10, 10, 1), rgba(0, 0, 0, 0))",
          }}
        />
        <div
          className="absolute left-0 h-full w-70 lg:w-80"
          style={{
            background:
              "linear-gradient(to right, rgba(10, 10, 10, 1), rgba(0, 0, 0, 0))",
          }}
        />
      </div>

      <div className="relative z-80 ">
        <div className="flex flex-col gap-12 px-6 md:px-35 pt-50 lg:pt-40">
          <div
            className="rounded-[5px] w-35 md:w-50 lg:w-65 h-60 md:h-80 lg:h-90 h-full aspect-[166/236] opacity-75 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`,
            }}
          />
          <div className="w-full">
            <div className="flex justify-between gap-2 items-center w-full border-b-2 pb-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {movie.original_title}
              </h1>

              <FavoriteButton
                isFavorited={isFavorited}
                onClick={handleFavorite}
              />
            </div>
            <div className="flex flex-col pt-5 gap-4">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex gap-2">
                  {movie.genres.length > 0 &&
                    movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-900 text-white text-sm rounded-full"
                      >
                        {genre.name ?? ""}
                      </span>
                    ))}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-1 h-1 bg-white/70 rounded-full inline-block"></span>
                  <p className="text-white/70">{releaseYear}</p>
                  <span className="w-1 h-1 bg-white/70 rounded-full inline-block ml-3"></span>
                  <p className="text-white/70">{movie.runtime} min</p>
                </div>
              </div>
              <p className="text-white/80 text-lg">{movie.overview}</p>
              <p className="text-white/70 text-md">
                Score: {movie.vote_average}
              </p>

              <p className="text-white/70">
                Country: {movie.production_countries?.[0]?.name ?? "Unknown"}
              </p>
            </div>
            <div className="pt-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Credits
              </h2>

              <p className="text-white/70">
                <span className="font-medium text-white">Director:</span>{" "}
                {credits.crew.find((member) => member.job === "Director")
                  ?.name || "Unknown"}
              </p>

              <p className="text-white/70 mt-2">
                <span className="font-medium text-white">Cast:</span>{" "}
                {credits.cast
                  .slice(0, 5)
                  .map((actor) => actor.name)
                  .join(", ") || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FavoriteButton({
  isFavorited,
  onClick,
}: {
  isFavorited: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex border-2 font-bold items-center cursor-pointer justify-center rounded-[5px] p-2 transition 
        ${
          isFavorited
            ? "bg-white text-black border-white"
            : "border-white text-white hover:bg-white/20"
        }`}
    >
      {isFavorited ? "Added to Favorites" : "Add to Favorites"}
    </button>
  );
}
