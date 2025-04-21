import React, { useRef } from "react";
import { TrendingMovie } from "../interfaces/interfaces";
import TrendingCard from "./TrendingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  movies: TrendingMovie[];
  title?: string;
}

const TrendingSlider: React.FC<Props> = ({ movies, title }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
  
    const scroll = (direction: "left" | "right") => {
      if (sliderRef.current) {
        const scrollAmount = sliderRef.current.offsetWidth;
        sliderRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };
  
    return (
      <section className="relative trending-slider w-full">
        {title && <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>}
  
        {/* Slider Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full"
          onClick={() => scroll("left")}
        >
          <ChevronLeft />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full"
          onClick={() => scroll("right")}
        >
          <ChevronRight />
        </button>
  
        {/* Cards container */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        >
          {movies.map((movie, index) => (
            <section
              key={movie.movie_id}
              className="flex-shrink-0 w-1/3 sm:w-1/4 xl:w-1/5"
            >
              <TrendingCard movie={movie} index={index} />
            </section>
          ))}
        </div>
      </section>
    );
  };
  

export default TrendingSlider;
