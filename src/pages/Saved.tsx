import { useEffect, useState } from "react";
import { getSavedMovies } from "../services/appwrite";
import MovieCard from "../components/MovieCard";
import { Movie } from "../interfaces/interfaces";

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
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
    <div className="bg-primary min-h-screen text-white px-5 py-10">
    <h1 className="text-2xl font-bold mb-6">Saved Movies</h1>

    {loading ? (
      <p className="text-gray-400">Loading...</p>
    ) : savedMovies.length === 0 ? (
      <p className="text-gray-400">You haven’t saved any movies yet.</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {savedMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    )}
  </div>
  );
}
