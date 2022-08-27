import React from "react";

export default function SubmittedReviewItem(props) {
  return (
    <div>
      <div className="flex justify-between">
        <h2>{props.username}</h2>
        <h2>{props.time}</h2>
      </div>
      <p className="bg-zinc-600 text-white">{props.description}</p>
      <hr className="my-3" />
    </div>
  );
}
