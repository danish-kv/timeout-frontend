import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({ onSearch }) => (
  <div className="mb-6 flex flex-wrap items-center gap-4">
    <div className="flex flex-1 items-center rounded-lg bg-white px-4 py-2 shadow-sm">
      <Search className="h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search employees..."
        onChange={(e) => onSearch(e.target.value)}
        className="ml-2 flex-1 border-none bg-transparent outline-none"
      />
    </div>
  </div>
);

export default SearchBar;
