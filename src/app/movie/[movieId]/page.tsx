import { getMovieCredits, getMovieDetails } from "@/lib/tmdb";
import MovieDetails from "./MovieDetails";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;

  const movie = await getMovieDetails(movieId);
  const credits = await getMovieCredits(movieId);

  return <MovieDetails movie={movie} credits={credits} />;
}
