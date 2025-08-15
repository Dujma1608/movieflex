"use client";
import { FavoriteMovie } from "@/app/utils/favoriteStorage";
import { useFavorites } from "@/context/FavoriteContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  title: string;
  release_date: string;
  poster: string | null;
}

export default function MoviePoster({
  poster,
  id,
  title,
  release_date,
}: Props) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);
  const releaseYear = release_date?.split("-")[0] ?? "Unknown";
  const router = useRouter();

  useEffect(() => {
    setIsFavorited(isFavorite(id));
  }, [id, isFavorite]);

  const handleFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (isFavorited) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        title,
        release_year: releaseYear,
        poster_path: poster,
      });
    }
  };

  return (
    <div
      className={`relative rounded-[5px] h-full aspect-[166/236] opacity-75 bg-cover bg-center ${
        id ? "cursor-pointer" : "cursor-default"
      }`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w342${poster})`,
      }}
      onClick={id ? () => router.push(`/movie/${id}`) : undefined}
    >
      <div
        onClick={handleFavorite}
        className="absolute flex items-center justify-center p-1 rounded-[10px] bg-black top-4 right-4"
      >
        <Image
          width={22}
          height={22}
          src={
            isFavorited ? "/images/filled-star.png" : "/images/outline-star.png"
          }
          alt="star"
        />
      </div>
    </div>
  );
}
