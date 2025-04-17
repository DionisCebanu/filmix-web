// src/components/Navigation.tsx
import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Home", path: "/", icon: "🏠" },
  { name: "Search", path: "/search", icon: "🔍" },
  { name: "Saved", path: "/saved", icon: "💾" },
  { name: "Profile", path: "/profile", icon: "👤" },
];

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-200 p-3 flex justify-around shadow-inner z-50">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium ${
              isActive ? "text-accent" : "text-white/60"
            }`
          }
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
