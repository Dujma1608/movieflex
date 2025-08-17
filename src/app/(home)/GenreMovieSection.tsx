import { Genre } from "@/models/Genre";
import { MovieListItem } from "@/models/Movie";
import MoviePoster from "@/components/movie-poster/MoviePoster";
import ScrollableList from "@/components/scrollable-list/ScrollableList";
import { getMovieGenres, popularMoviesByGenre } from "@/lib/tmdb";

export default async function GenreMovieSection() {
  const genres: Genre[] = await getMovieGenres();
  const MAX_GENRES = 10;
  const FIRST_PAGE = 1;

  const moviesByGenre = await Promise.all(
    genres.slice(0, MAX_GENRES).map(async (genre) => {
      const movies = await popularMoviesByGenre(FIRST_PAGE, genre.id);
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
