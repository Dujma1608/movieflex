"use client";

import FavoriteItem from "./FavoriteItem";
import { useFavorites } from "@/context/FavoriteContext";

export default function FavoritesList() {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleRemove = (id: number) => {
    removeFromFavorites(id);
  };

  return (
    <div className="absolute top-12 bg-gray-900 p-3 -right-23 right-0-mid lg:right-0 max-h-[260px] lg:max-h-[380px] w-max overflow-y-auto shadow-xl">
      <ul className="flex flex-col gap-4">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <FavoriteItem
              key={movie.id}
              movie={movie}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p className="text-[12px] font-bold">No favorites yet.</p>
        )}
      </ul>
    </div>
  );
}
