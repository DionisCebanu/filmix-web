import useFetch from "../services/useFetch";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import { Movie } from "../interfaces/interfaces";

export default function Home() {
  const { data: movies, loading, error } = useFetch(() =>
    fetchMovies({ query: "" })
  );

  return (
    <div className="p-5">
      <h1 className="text-white text-2xl font-bold mb-4">Latest Movies</h1>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {movies?.map((movie: Movie) => (
        <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
