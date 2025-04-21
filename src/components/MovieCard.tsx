import { Link } from "react-router-dom";
import { Movie } from "../interfaces/interfaces";

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Partial<Movie>) => {
  return (
    
      <Link to={`/movie/${id}`}>
        <div className="w-full transform transition-transform duration-200 hover:scale-[1.03]">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placeholder.co/600x400/1a1a1a/ffffff.png"
            }
            alt={title}
            className="rounded-lg w-full h-auto object-cover"
          />
          <h3 className="text-white font-bold mt-2 text-sm truncate">{title}</h3>
          <div className="flex items-center gap-x-2 text-xs text-light-300 mt-1">
            <span>⭐ {Math.round((vote_average ?? 0) / 2)}</span>
            <span>{release_date?.split("-")[0]}</span>
          </div>
        </div>
      </Link>
  );
};

export default MovieCard;
