import React from "react";
import CollectionDetail from "../components/DetailItem/CollectionDetail";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

export default function CollectionProducts() {
  return (
    <>
      <SearchBar />
      <div className="flex mt-7 gap-20 p-5">
        <SideBar />
        <CollectionDetail />
      </div>
    </>
  );
}
