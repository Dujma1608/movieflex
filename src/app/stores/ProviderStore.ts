import { makeAutoObservable, runInAction } from "mobx";
import { MovieProvider } from "../models/MovieProvider";
import agent from "../api/agent";
import { MovieListItem } from "../models/Movie";

export default class ProviderStore {
  streamingServices: MovieProvider[] = [];
  topMoviesByProvider: MovieListItem[] = [];
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadStreamingServices = async (region = "US") => {
    this.error = null;

    try {
      const response = await agent.Providers.getMovieProviders(region);
      runInAction(() => {
        this.streamingServices = response.results.slice(0, 10);
      });
    } catch (err: unknown) {
      runInAction(() => {
        if (err instanceof Error) {
          this.error = `Failed to load streaming services: ${err.message}`;
        } else {
          this.error = "Failed to load streaming services.";
        }
      });
    }
  };

  loadTopMoviesByProvider = async (providerId: number) => {
    try {
      const response = await agent.Providers.getTopMoviesByProvider(providerId);
      runInAction(() => {
        this.topMoviesByProvider = response.results
          .filter((movie: MovieListItem) => movie.poster_path)
          .slice(0, 3);
      });
    } catch (err: unknown) {
      runInAction(() => {
        if (err instanceof Error) {
          this.error = `Failed to load top movies by provider: ${err.message}`;
        } else {
          this.error = "Failed to load top movies by provider.";
        }
      });
    }
  };
}
