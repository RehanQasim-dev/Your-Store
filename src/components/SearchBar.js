import React from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/Slices/uiSlice";
import { useRef } from "react";
import "./SearchBar.css";
export default function SearchBar() {
  const Dispatch = useDispatch();
  const ref = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    Dispatch(uiActions.setSearch(ref.current.value));
    ref.current.value = "";
  };
  return (
    <form className="w-2/3 flex mx-auto mt-9 h-10" onSubmit={submitHandler}>
      <input
        ref={ref}
        type="text"
        className="search-input focus:outline-none pl-3 text-xl font-medium"
      />
      <button className="search-btn text-white text-2xl bg-zinc-700 hover:bg-zinc-800">
        Search
      </button>
    </form>
  );
}
