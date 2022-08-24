import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  return (
    <div className=" bg-white shadow-md rounded-xl table">
      <Link to={`/products/${props.id}`}>
        <img
          className="w-full"
          src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg"
          alt=""
        />
      </Link>
      <div className="px-5 py-3 flex justify-between">
        <div>
          <Link className="text-xl font-medium" to={`/products/${props.id}`}>
            {props.title}
          </Link>
          <h1 className="text-xl font-bold">{props.price}</h1>
        </div>
        <h1>{props.inventory ? "In Stock" : "Out of Stock"}</h1>
      </div>
    </div>
  );
}
