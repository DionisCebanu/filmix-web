import React from "react";
import logo from "./logo.svg";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Saved } from "./pages/Saved";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="pb-20 bg-primary min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Navigation />
      </div>
  </Router>
  );
}

export default App;
