import { FavoriteMovie } from "@/utils/favoriteStorage";
import { useRouter } from "next/navigation";

interface Props {
  movie: FavoriteMovie;
  onRemove: (id: number) => void;
}

export default function FavoriteItem({ movie, onRemove }: Props) {
  const router = useRouter();
  return (
    <li className="flex items-center justify-between gap-5 lg:gap-10 pr-2 hover:bg-gray-700">
      <div
        className="flex gap-4 p-1.5"
        onClick={() => router.push(`/movie/${movie.id}`)}
      >
        <img
          width={60}
          height={90}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="logo"
        />
        <div className="flex flex-col items-start gap-3">
          <p className="w-[120px] text-[14px] text-white font-semibold text-left">
            {movie.title}
          </p>
          <p className="text-[12px] text-white/70 text-sm">
            {movie.release_year}
          </p>
        </div>
      </div>
      <button
        className="border-2 border-red-300 rounded-[5px] text-[12px] font-bold p-1 text-red-300 text-sm cursor-pointer hover:bg-red-300/20"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(movie.id);
        }}
      >
        Remove
      </button>
    </li>
  );
}
