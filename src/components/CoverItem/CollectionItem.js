import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { uiActions } from "../../store/Slices/uiSlice";

export default function CollectionItem(props) {
  const Dispatch = useDispatch();
  const onClickHandler = () => {
    Dispatch(uiActions.setSearch(""));
  };
  return (
    <div className="flex justify-between gap-20 mb-2 ">
      <Link
        onClick={onClickHandler}
        className="font-normal text-md hover:underline"
        to={`/collections/${props.id}`}
      >
        {props.title}
      </Link>
      <div className="font-bold text-md text-white px-2 rounded-lg bg-green-700">
        {props.count}
      </div>
    </div>
  );
}
