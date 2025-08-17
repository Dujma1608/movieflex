import Hero from "@/app/(home)/Hero";
import TopStreamingMovies from "@/app/(home)/TopStreamingMovies";
import NewestMovies from "./NewestMovies";
import GenreMovieSection from "./GenreMovieSection";

export default async function Home() {
  return (
    <div className="h-screen">
      <Hero />
      <main className="flex flex-col px-4 lg:px-12 gap-4 lg:gap-6 pb-10">
        <NewestMovies />
        <TopStreamingMovies />
        <GenreMovieSection />
      </main>
    </div>
  );
}
