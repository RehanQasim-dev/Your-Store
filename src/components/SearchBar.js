import React from "react";
import "./SearchBar.css";
export default function SearchBar() {
  return (
    <div className="w-2/3 flex mx-auto mt-9 h-10">
      <input
        type="text"
        className="search-input focus:outline-none pl-3 text-xl font-medium"
      />
      <button className="search-btn text-white text-2xl bg-zinc-700 hover:bg-zinc-800">
        Search
      </button>
    </div>
  );
}
