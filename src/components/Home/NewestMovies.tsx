import { MovieListItem } from "@/app/models/Movie";
import MoviePoster from "@/app/movie/[movieId]/MoviePoster";
import { getDiscoverMovies } from "@/lib/tmdb";
import ScrollableList from "../ScrollableList";

export default async function NewestMovies() {
  const movies = await getDiscoverMovies();

  return (
    <div className="mt-14">
      <h1 className="font-bold text-[30px] mt-4 mb-2">Newest movies</h1>

      <ScrollableList>
        {movies.results.map((movie: MovieListItem) => (
          <MoviePoster
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date}
          />
        ))}
      </ScrollableList>
    </div>
  );
}
