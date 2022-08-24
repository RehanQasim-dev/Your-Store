import React from "react";
import Collections from "./Lists/Collections";
export default function SideBar() {
  const [showCategory, setShowCategory] = React.useState(true);
  return (
    <div className="w-1/5">
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
    </div>
  );
}
