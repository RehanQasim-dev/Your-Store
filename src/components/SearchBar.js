import React from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/Slices/uiSlice";
import { useRef } from "react";
import "./SearchBar.css";
export default function SearchBar() {
  const Dispatch = useDispatch();
  const ref = useRef();
  const onClickHandler = (event) => {
    Dispatch(uiActions.setSearch(ref.current.value));
    ref.current.value = "";
  };
  return (
    <div className="w-2/3 flex mx-auto mt-9 h-10">
      <input
        ref={ref}
        type="text"
        className="search-input focus:outline-none pl-3 text-xl font-medium"
      />
      <button
        onClick={onClickHandler}
        className="search-btn text-white text-2xl bg-zinc-700 hover:bg-zinc-800"
      >
        Search
      </button>
    </div>
  );
}
