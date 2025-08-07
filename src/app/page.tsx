import Hero from "@/components/Home/Hero";
import TopStreamingMovies from "@/components/Home/TopStreamingMovies";
import GenreMovieSection from "@/components/Home/GenreMovieSection";
import NewestMovies from "@/components/Home/NewestMovies";

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
