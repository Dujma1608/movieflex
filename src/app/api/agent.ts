import axios, { AxiosResponse } from "axios";
import { MovieProvidersResponse } from "../models/MovieProvider";
import { MovieListItem, MovieSearchResponse } from "../models/Movie";
import { toast } from "react-toastify";
import { GenresResponse } from "../models/Genre";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const responseBody = (response: AxiosResponse) => response.data;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

axios.interceptors.request.use((config) => {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (token && config.headers) config.headers.Authorization = `bearer ${token}`;

  config.params["api_key"] = API_KEY;

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || error.message;
    toast.error(`API Error: ${message}`);
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, { params }).then(responseBody),
};

const Providers = {
  getMovieProviders: (region = "US") =>
    requests.get<MovieProvidersResponse>("/watch/providers/movie", {
      api_key: API_KEY,
      language: "en-US",
      watch_region: region,
    }),
  getTopMoviesByProvider: (providerId: number, region = "US") =>
    requests.get<MovieListItem>("/discover/movie", {
      sort_by: "popularity.desc",
      with_watch_providers: providerId,
      watch_region: region,
    }),
};

const Genres = {
  getMovieGenres: () =>
    requests.get<GenresResponse>("/genre/movie/list", {
      language: "en-US",
    }),
};

const Movies = {
  getSearchedMovies: (query: string, page: number = 1) =>
    requests.get<MovieSearchResponse>("/search/movie", {
      language: "en-US",
      query,
      page,
    }),
};

const agent = {
  Providers,
  Genres,
  Movies,
};

export default agent;
