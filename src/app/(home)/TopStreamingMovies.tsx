"use client";

import MoviePoster from "@/components/movie-poster/MoviePoster";
import StreamingServices from "../../components/dropdowns/StreamingServicesDropdown";
import { useEffect, useState } from "react";
import { MovieProvider } from "@/models/MovieProvider";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";

function TopStreamingMovies() {
  const { providerStore } = useStore();
  const { streamingServices, loadTopMoviesByProvider, topMoviesByProvider } =
    providerStore;

  const [selectedService, setSelectedService] = useState<MovieProvider | null>(
    null
  );

  useEffect(() => {
    if (streamingServices.length && !selectedService) {
      setSelectedService(streamingServices[0]);
    }
  }, [streamingServices, selectedService]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedService) {
        await loadTopMoviesByProvider(selectedService.provider_id);
      }
    };
    fetchMovies();
  }, [selectedService, loadTopMoviesByProvider]);

  return (
    <div className="space-y-6 lg:w-fit">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex gap-6 justify-between items-center">
          <h1 className="font-bold text-[20px] lg:text-[30px] mt-4 mb-2">
            Top movies on {selectedService?.provider_name}
          </h1>
          <StreamingServices
            selectedService={selectedService!}
            onSelect={setSelectedService}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 lg:gap-10 overflow-y-hidden overflow-x-auto hide-scrollbar h-full">
          {topMoviesByProvider.map((movie, index) => (
            <div
              key={movie.id}
              className="flex items-baseline h-60 md:h-60 lg:h-70 xxl:h-80"
            >
              <p className="text-white/20 text-[180px] ml-5 font-bold">
                {index + 1}
              </p>
              <MoviePoster
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default observer(TopStreamingMovies);
