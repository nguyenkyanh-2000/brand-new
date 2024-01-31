"use client";

import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SlideIn from "../animation/SlideIn";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function SearchProduct({ size }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsDialogOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen]);

  return (
    <div className="flex justify-center">
      <Search onClick={() => setIsDialogOpen(true)} size={size}></Search>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex w-screen justify-center bg-black bg-opacity-40">
          <SlideIn direction="down" duration={0.5}>
            <div
              className="absolute left-1/2 mt-10 w-4/5 -translate-x-1/2 lg:w-1/2"
              ref={inputRef}
            >
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              {searchTerm && (
                <SearchResults
                  searchTerm={searchTerm}
                  setIsDialogOpen={setIsDialogOpen}
                />
              )}
            </div>
          </SlideIn>
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
