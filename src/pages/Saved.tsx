import { useEffect, useState } from "react";
import { getSavedMovies } from "../services/appwrite";
import MovieCard from "../components/MovieCard";
import { Movie } from "../interfaces/interfaces";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }
      const data = await getSavedMovies();

      const mapped: Movie[] = data.map((doc: any) => ({
        id: parseInt(doc.movie_id),
        title: doc.title || "Untitled",
        poster_path: doc.poster_url
          ? doc.poster_url.replace("https://image.tmdb.org/t/p/w500", "")
          : "",
        vote_average: 10, // You can update this to be dynamic if needed
        release_date: "",

        // Required fields for <MovieCard /> but not stored in DB yet
        adult: false,
        backdrop_path: null,
        genre_ids: [],
        original_language: "",
        original_title: "",
        overview: "",
        popularity: 0,
        video: false,
        vote_count: 0,
      }));

      setSavedMovies(mapped);
      setLoading(false);
    };

    loadMovies();
  }, []);
  
  return (
    <section className="structure">
      <div className="min-h-screen text-white px-5 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Saved Movies</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : !isLoggedIn ? (
        <div className="text-center space-y-4">
            <p className="text-gray-300 text-lg">You are not logged in.</p>
            <Link
              to="/profile"
              className="inline-block bg-accent text-white px-6 py-3 rounded shadow hover:bg-accent/90"
            >
              Login to view your saved movies
            </Link>
          </div>
      ) : savedMovies.length === 0 ? (
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-lg max-w-md mx-auto">
          <FontAwesomeIcon icon={faSearch}  className="w-16 h-16 opacity-70" />
          <h2 className="text-xl font-semibold text-white">No Saved Movies</h2>
          <p className="text-gray-400">You haven’t saved any movies yet. Start browsing and save your favorites!</p>
          <Link
            to="/"
            className="bg-accent text-white px-6 py-2 rounded-md hover:bg-accent/90 transition"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {savedMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
        </div>
    </section>
  );
}
