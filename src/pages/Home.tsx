import useFetch from "../services/useFetch";
import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import TrendingCard from "../components/TrendingCard";
import { Movie, TrendingMovie } from "../interfaces/interfaces";
import { getTrendingMovies } from "../services/appwrite";

export default function Home() {
  const { data: movies, loading, error } = useFetch(() =>
    fetchMovies({ query: "" })
  );

  const [trending, setTrending] = useState<TrendingMovie[]>([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      const result = await getTrendingMovies();
      if (result) setTrending(result);
      setLoadingTrending(false); // ✅ fix here
    };

    fetchTrending();
  }, []);

  return (
    <div className="p-5">
      {/* ✅ Trending Section */}
      <h1 className="text-white text-2xl font-bold mb-4">Trending Movies</h1>
      {loadingTrending ? (
        <p className="text-gray-300">Loading trending movies...</p>
      ) : trending.length === 0 ? (
        <p className="text-gray-500">No trending movies found.</p>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-6">
          {trending.map((movie, index) => (
            <TrendingCard key={movie.movie_id} movie={movie} index={index} />
          ))}
        </div>
      )}

      {/* ✅ Latest Section */}
      <h1 className="text-white text-2xl font-bold mt-10 mb-4">Latest Movies</h1>
      {loading && <p className="text-gray-300">Loading latest movies...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
