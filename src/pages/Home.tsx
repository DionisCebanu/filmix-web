import useFetch from "../services/useFetch";
import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import TrendingCard from "../components/TrendingCard";
import SplashScreen from "../components/SplashScreen";
import { Movie, TrendingMovie } from "../interfaces/interfaces";
import { getTrendingMovies } from "../services/appwrite";
import TrendingSlider from "../components/TrendingSlider";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";


export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { data: movies, loading, error } = useFetch(() =>
    fetchMovies({ query: "" })
  );

  const [trending, setTrending] = useState<TrendingMovie[]>([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      const result = await getTrendingMovies();
      if (result) setTrending(result);
      setLoadingTrending(false); // ✅ fix here
    };

    fetchTrending();
  }, []);

  return (
    <>

      {showSplash ? (
        <SplashScreen />
      ) : (  
      <>  
        <header className="logo-header">
            <img src="/images/logo-filmix.png" alt="filmix logo" />
        </header> 
        <section className="structure">

        {/*Search component */}
          <Link to="/search" className="block">
            <SearchBar
              placeholder="Search for a movie..."
              value=""
              onChange={() => {}}
            />
          </Link>
          {/* Trending Section */}
          <h1 className="title">Trending Movies</h1>
        </section>
        <section className="structure">
          {loadingTrending ? (
              <p className="text-gray-300">Loading trending movies...</p>
            ) : trending.length === 0 ? (
              <p className="text-gray-500">No trending movies found.</p>
            ) : (
              <TrendingSlider movies={trending} />
            )}

            
          {/* ✅ Latest Section */}
          {/* ✅ Latest Title */}
          <h1 className="title">Latest Movies</h1>
          {loading && <p className="text-gray-300">Loading latest movies...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {/* ✅ Latest Card List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {movies?.map((movie: Movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </>
      )}
    </>
  );
}
