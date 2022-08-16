import React from "react";
import { Link } from "react-router-dom";

export default function CollectionItem(props) {
  return (
    <div className=" bg-purple-600 border-2 text-center w-1/2 table-center text-white border-purple-900 mb-5 hover:bg-purple-200 hover:text-purple-800">
      <Link className="font-bold text-2xl " to={`/collections/${props.id}`}>
        {props.title}
      </Link>
      <h1 className="font-bold text-xl">{props.count}</h1>
    </div>
  );
}
