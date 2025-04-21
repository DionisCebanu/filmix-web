import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  onSubmit?: () => void;
}

const SearchBar: React.FC<Props> = ({ placeholder, value, onChange, onSubmit }) => {
  return (
    <div className="flex items-center bg-dark-200 rounded-full px-5 py-3 focus-within:ring-2 ring-accent w-full lg:w-[500px]">
      
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit();
        }}
        className="bg-transparent ml-2 text-white placeholder-gray-400 outline-none flex-1"
      />
      <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
    </div>
  );
};

export default SearchBar;
