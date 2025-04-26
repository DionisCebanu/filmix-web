import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieVideos } from "../services/api";
import { MovieDetails as MovieDetailsType } from "../interfaces/interfaces";
import { MovieVideo } from "../interfaces/interfaces";
import { saveMovie, getSavedMovies } from "../services/appwrite";
import { removeMovie } from "../services/appwrite";
import { showAlert } from "../utils/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!id) return;
    const userStr = localStorage.getItem("user");
    setIsLoggedIn(!!userStr);

    const loadMovie = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovie(details);
  
        if (userStr) {
          const saved = await getSavedMovies();
          const isSaved = saved.some((m) => String(m.movie_id) === String(id));
          setAlreadySaved(isSaved);
        }

        // Fetch Movie trailer
        const videos = await fetchMovieVideos(id);
        const trailer = videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Failed to load movie", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  //Remove movie from the saved list
  const handleRemove = async () => {
    await removeMovie(movie!.id);
    /* alert(`${movie!.title} removed from saved list.`); */
    showAlert(`${movie!.title} removed from saved list.`);
    setAlreadySaved(false);
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!movie) return <div className="text-red-500 text-center mt-10">Movie not found.</div>;

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10">
      <div className="text-white p-6 max-w-[80rem] mx-auto bg-blue-500/10 rounded-[10px]">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-icon mb-5 w-full sm:w-60"
        >
          ← Go back
        </button>
      
        <div 
          className="flex flex-col md:flex-row gap-6 "
        >
          <picture className="relative w-full md:w-[800px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
              {trailerKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-accent p-3 text-white rounded-full shadow-md hover:bg-accent-dark transition"
                >
                  🎬 Watch Trailer
                </a>
              )}
          </picture>
          <div>
            <h1 className="text-3xl font-bold md:text-[40px]">{movie.title}</h1>
            <p className="text-light-300 mt-2 italic md:text-[20px]">
              {movie.release_date?.split("-")[0]} • {movie.runtime} min
            </p>
            <div className="mt-4 space-y-3 md:text-[20px]">
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
              {isLoggedIn && (
                alreadySaved ? (
                  <button
                    onClick={handleRemove}
                    className="bg-red-600 text-white px-5 py-2 rounded mt-6"
                  >
                    Remove from Saved
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      saveMovie(movie).then(() => {
                        showAlert(`${movie.title} added to your saved list!`);
                        setAlreadySaved(true);
                      });
                    }}
                    className="btn btn-icon p-[20px]"
                  >
                    Save Movie 
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
