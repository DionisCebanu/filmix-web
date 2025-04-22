// src/components/SplashScreen.tsx
import React from "react";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center gap-6 animate-fade-in-out">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <img
        src="/images/logo-filmix.png"
        alt="Filmix Logo"
        className="w-20 opacity-80"
      />
      <p className="text-white text-lg font-semibold tracking-wide">
        Powered by TMDB Movie API
      </p>
    </div>
  );
}
