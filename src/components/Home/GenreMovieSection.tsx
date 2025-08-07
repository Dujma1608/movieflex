import { Genre } from "@/app/models/Genre";
import { MovieListItem } from "@/app/models/Movie";
import MoviePoster from "@/app/movie/[movieId]/MoviePoster";
import { getMovieGenres, popularMoviesByGenre } from "@/lib/tmdb";
import ScrollableList from "../ScrollableList";

export default async function GenreMovieSection() {
  const genres: Genre[] = await getMovieGenres();

  const moviesByGenre = await Promise.all(
    genres.slice(0, 10).map(async (genre) => {
      const movies = await popularMoviesByGenre(1, genre.id);
      return {
        genre,
        movies: movies.results as MovieListItem[],
      };
    })
  );

  return (
    <div className="mt-14 w-full">
      {moviesByGenre.map(({ genre, movies }) => (
        <div key={genre.id}>
          <h1 className="font-bold text-[30px] mt-4 mb-2">{genre.name}</h1>

          <ScrollableList>
            {movies.map((movie) => (
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
      ))}
    </div>
  );
}
