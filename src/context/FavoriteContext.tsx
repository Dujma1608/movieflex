"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  FavoriteMovie,
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorites,
} from "@/app/utils/favoriteStorage";

interface FavoriteContext {
  favorites: FavoriteMovie[];
  isFavorite: (id: number) => boolean;
  addToFavorites: (movie: FavoriteMovie) => void;
  removeFromFavorites: (id: number) => void;
}

const FavoriteContext = createContext<FavoriteContext | null>(null);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const addToFavorites = (movie: FavoriteMovie) => {
    addFavorite(movie);
    setFavorites(getFavorites());
  };

  const removeFromFavorites = (id: number) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  const isFavorite = (id: number) => isFavorites(id);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used inside favorite provider");
  }
  return context;
};
