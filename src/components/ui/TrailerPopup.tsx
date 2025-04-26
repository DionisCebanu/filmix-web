import React from "react";

interface TrailerPopupProps {
  videoKey: string;
  onClose: () => void;
}

export const TrailerPopup = ({ videoKey, onClose }: TrailerPopupProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl aspect-video">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-full text-sm font-bold z-10"
        >
          ✕ Close
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Movie Trailer"
          className="w-full h-full rounded-lg shadow-xl"
        ></iframe>
      </div>
    </div>
  );
};
