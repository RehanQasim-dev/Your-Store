import React from "react";

import { Link } from "react-router-dom";

export default function ProductItem(props) {
  return (
    <div className=" bg-purple-600 border-2 text-center text-white border-purple-900 mb-5 hover:bg-purple-200 hover:text-purple-800">
      <Link className="font-bold text-2xl " to={`/products/${props.id}`}>
        {props.title}
      </Link>
      <h1 className="font-bold text-xl"> {props.price}$</h1>
      <div className="font-bold text-xl text-center table p-2 border-black border-2 rounded-lg mx-auto">
        {props.inventory}
      </div>
    </div>
  );
}
