import React from "react";
import { TrendingMovie } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

interface Props {
  movie: TrendingMovie;
  index: number;
}

const TrendingCard: React.FC<Props> = ({ movie, index }) => {
  return (
    <Link to={`/movie/${movie.movie_id}`} className="flex-1 min-w-0">
      <div className="relative transform transition-transform duration-200 hover:scale-[1.01]">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-52 rounded-lg object-cover shadow-lg"
        />

        {/* Index badge */}
        <div className="absolute bottom-10 -left-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xl">{index + 1}</span>
        </div>
      </div>

      <p className="text-sm font-semibold mt-2 text-white truncate">
        {movie.title}
      </p>
    </Link>
  );
};

export default TrendingCard;
