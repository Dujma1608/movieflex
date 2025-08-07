import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { MovieListItem, MovieSearchResponse } from "../models/Movie";

export default class MovieStore {
  searchMovies: MovieListItem[] = [];
  searchResults: MovieListItem[] = [];
  searchError: string | null = null;
  loading = false;
  totalResults = 0;
  currentPage = 1;

  constructor() {
    makeAutoObservable(this);
  }

  getSearchedMovies = async (query: string, page: number = 1) => {
    this.loading = true;
    this.searchError = null;
    try {
      const response: MovieSearchResponse =
        await agent.Movies.getSearchedMovies(query, page);
      runInAction(() => {
        const result = response.results.filter(
          (movie) => movie.poster_path !== null
        );
        if (page === 1) {
          this.searchMovies = result;
        } else {
          this.searchMovies = [...this.searchMovies, ...result];
        }
        this.totalResults = response.total_results;
        this.currentPage = response.page;
        this.loading = false;
      });
    } catch (error: unknown) {
      runInAction(() => {
        if (error instanceof Error) {
          this.searchError = error.message;
        } else {
          this.searchError = "Failed to fetch search movies.";
        }
        this.loading = false;
      });
    }
  };

  getSearchedResults = async (query: string) => {
    this.searchError = null;
    try {
      const response: MovieSearchResponse =
        await agent.Movies.getSearchedMovies(query);
      runInAction(() => {
        const allMovies = [...response.results];
        const filteredDuplicates = allMovies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );
        this.searchResults = filteredDuplicates.filter(
          (movie) => movie.poster_path !== null
        );
      });
    } catch (error: unknown) {
      runInAction(() => {
        if (error instanceof Error) {
          this.searchError = error.message;
        } else {
          this.searchError = "Failed to fetch search results.";
        }
      });
    }
  };

  clearSearch = () => {
    this.searchResults = [];
  };
}
