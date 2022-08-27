import React from "react";
import Collections from "./Lists/Collections";
export default function SideBar() {
  const [showCategory, setShowCategory] = React.useState(true);
  return (
    <div className="basis-1/5">
      <h1 className="text-xl mb-3">Filters & refine</h1>
      <section className="Category">
        <div className="flex justify-between gap-20">
          <h2 className="text-lg mb-2">Category</h2>
          <button
            className="text-xl"
            onClick={(e) => setShowCategory((old) => !old)}
          >
            &#8964;
          </button>
        </div>
        <h2 className="font-medium text-md ml-1 mb-2">All Categories</h2>
        {showCategory && (
          <div className="ml-3">
            <Collections />
          </div>
        )}
      </section>
      <section id="filters" className="mt-3">
        <h2 className="text-lg font-medium">Filters</h2>
        <h2 className="text-md mt-2 ml-1"> Price Filter</h2>
        <div className="mt-2">
          <div className="flex justify-between mb-3">
            <h3 className="text-md font-normal text-zinc-800 ml-2">
              Lower Bound:{" "}
            </h3>
            <input
              type="text"
              className="w-24 flex-grow-0 text-xl font-medium pl-3 focus:outline-none"
            />
          </div>
          <div className="flex justify-between">
            <h3 className="font-normal text-md text-zinc-800 ml-2 ">
              Upper Bound:{" "}
            </h3>
            <input
              type="text"
              className="w-24 flex-grow-0 text-xl font-medium pl-3 focus:outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
