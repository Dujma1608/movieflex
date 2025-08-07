import { createContext, useContext } from "react";
import MovieStore from "./MovieStore";
import ProviderStore from "./ProviderStore";
import GenreStore from "./GenreStore";

interface Store {
  movieStore: MovieStore;
  providerStore: ProviderStore;
  genreStore: GenreStore;
}

export const store: Store = {
  movieStore: new MovieStore(),
  providerStore: new ProviderStore(),
  genreStore: new GenreStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
