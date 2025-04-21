// src/components/Navigation.tsx
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
  { name: "Home", path: "/", icon: faHouse },
  { name: "Search", path: "/search", icon: faMagnifyingGlass },
  { name: "Saved", path: "/saved", icon: faBookmark },
  { name: "Profile", path: "/profile", icon: faUser },
];

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-200 p-3 flex justify-around shadow-inner z-50">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium p-2 transition-colors ${
              isActive ? "text-accent" : "text-white hover:text-accent"
            }`
          }
        >
          <FontAwesomeIcon icon={tab.icon} className="text-lg mb-1" />
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
