import React from "react";
import { Search } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-4 text-muted-foreground"
      />
      <input
        autoFocus
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-full p-3 pl-10 focus:outline-0"
      />
    </div>
  );
}

export default SearchBar;
