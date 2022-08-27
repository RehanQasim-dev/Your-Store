import React from "react";

export default function LoadedReviewItem(props) {
  return (
    <div>
      <div className="flex justify-between">
        <h2>{props.username}</h2>
        <h2>{props.time}</h2>
      </div>
      <p>{props.description}</p>
      <hr className="my-3" />
    </div>
  );
}
