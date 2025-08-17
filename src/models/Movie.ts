export interface MovieListItem {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  backdrop_path: string | null;
  video: boolean;
}

export interface MovieSearchResponse {
  page: number;
  results: MovieListItem[];
  total_pages: number;
  total_results: number;
}
