import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { GenresResponse } from "../models/Genre";

export default class GenreStore {
  genres: { id: number; name: string }[] = [];
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadGenres = async () => {
    try {
      const data: GenresResponse = await agent.Genres.getMovieGenres();
      runInAction(() => {
        this.genres = data.genres;
      });
    } catch (error: unknown) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = `Failed to load genres: ${error.message}`;
        } else {
          this.error = "Failed to load genres.";
        }
      });
    }
  };
}
