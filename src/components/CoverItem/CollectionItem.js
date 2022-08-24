import React from "react";
import { Link } from "react-router-dom";

export default function CollectionItem(props) {
  return (
    <div className="flex justify-between gap-20 mb-2">
      <Link className="font-normal text-md " to={`/collections/${props.id}`}>
        {props.title}
      </Link>
      <div className="font-bold text-md text-white px-2 rounded-lg bg-green-700">
        {props.count}
      </div>
    </div>
  );
}
