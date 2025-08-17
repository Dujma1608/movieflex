import { MovieListItem } from "@/models/Movie";
import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getDiscoverMovies(
  page: number = 1,
  genreId?: number[],
  releaseYear?: number,
  minScore?: number
) {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        sort_by: "release_date.desc",
        page,
        with_genres: genreId,
        primary_release_year: releaseYear,
        "vote_average.gte": minScore,
      },
    });

    const filteredResults = res.data.results.filter(
      (movie: MovieListItem) => movie.poster_path !== null
    );

    return {
      ...res.data,
      results: filteredResults,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch movies: Unknown error`);
    }
  }
}

export async function popularMoviesByGenre(page: number = 1, genreId?: number) {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        sort_by: "popularity.desc",
        page,
        with_genres: genreId,
      },
    });

    const filteredResults = res.data.results.filter(
      (movie: MovieListItem) => movie.poster_path !== null
    );

    return {
      ...res.data,
      results: filteredResults,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch popular movies by genre: ${error.message}`
      );
    } else {
      throw new Error(`Failed to fetch popular movies by genre.`);
    }
  }
}

export async function getMovieDetails(movieId: string) {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movie details: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch movie details.`);
    }
  }
}

export async function getMovieCredits(movieId: string) {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: { api_key: API_KEY },
    });

    if (!res) throw new Error("Failed to fetch credits");

    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movie credits: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch movie credits.`);
    }
  }
}
export async function getMovieGenres() {
  try {
    const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
      },
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    if (!res || !res.data) {
      throw new Error("Failed to fetch genres");
    }

    return res.data.genres;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movie genres: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch movie genres.`);
    }
  }
}
