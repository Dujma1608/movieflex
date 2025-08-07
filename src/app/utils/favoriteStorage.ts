export interface FavoriteMovie {
  id: number;
  title: string;
  release_year: string;
  poster_path?: string | null;
}

const STORAGE_KEY = "favorites";

export function getFavorites(): FavoriteMovie[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) return JSON.parse(data);
  return [];
}

export function addFavorite(movie: FavoriteMovie) {
  const current = getFavorites();
  if (!current.find((m) => m.id === movie.id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, movie]));
  }
}

export function removeFavorite(movieId: number) {
  const current = getFavorites();
  const filtered = current.filter((movie) => movie.id !== movieId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function isFavorites(movieId: number) {
  const current = getFavorites();
  const isFavorite = current.some((m) => m.id === movieId);

  return isFavorite;
}
