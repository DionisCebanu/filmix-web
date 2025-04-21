import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../services/api";
import { updateSearchCount } from "../services/appwrite";
import { Movie } from "../interfaces/interfaces";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          setLoading(true);
          const results = await fetchMovies({ query: searchQuery });
          setMovies(results);

          if (results?.length > 0) {
            await updateSearchCount(searchQuery, results[0]);
          }
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setMovies([]);
        setError(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <section className="structure">
      <div className="px-5 py-10 bg-primary min-h-screen text-white">
        <header className="mx-auto max-w-xl">
          <h1 className="text-2xl font-bold mb-6">Search Movies</h1>
          <SearchBar
            placeholder="Search for a movie"
            value={searchQuery}
            onChange={(text) => setSearchQuery(text)}
          />
        </header>
        {loading && <p className="text-gray-400 mt-4">Loading...</p>}
        {error && (
          <p className="text-red-500 mt-4">Error: {error.message}</p>
        )}
        {!loading && !error && searchQuery.trim() && movies.length > 0 && (
          <p className="text-accent mt-4 font-medium">
            Search Results for <strong>{searchQuery}</strong>
          </p>
        )}
        {!loading && !error && searchQuery.trim() && movies.length === 0 && (
          <p className="text-gray-500 mt-6">No movies found.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
