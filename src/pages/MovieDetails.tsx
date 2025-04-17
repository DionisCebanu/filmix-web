import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/api";
import { MovieDetails as MovieDetailsType } from "../interfaces/interfaces"; // if declared

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchMovieDetails(id)
      .then(setMovie)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!movie) return <div className="text-red-500 text-center mt-10">Movie not found.</div>;

  return (
    <div className="text-white p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-accent mb-4 underline"
      >
        ← Go back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-72 rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-light-300 mt-2 italic">
            {movie.release_date?.split("-")[0]} • {movie.runtime} min
          </p>

          <div className="mt-4 space-y-3">
            <p>{movie.overview}</p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((g) => g.name).join(" • ") || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {Math.round(movie.vote_average)}/10 (
              {movie.vote_count} votes)
            </p>
            <p>
              <strong>Production:</strong>{" "}
              {movie.production_companies?.map((c) => c.name).join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
