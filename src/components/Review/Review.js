import React from "react";
import LoadedReviewItem from "./LoadedReviewItem";
import SubmittedReviewItem from "./SubmittedReviewItem";
import ReviewInput from "./ReviewInput";
import { useSelector } from "react-redux/es/hooks/useSelector";
export default function Review(props) {
  const loadedReviews = useSelector((state) => state.Review.loaded);
  const submittedReviews = useSelector((state) => state.Review.added);
  const submittedElements = submittedReviews.map((review) => (
    <SubmittedReviewItem
      description={review.description}
      username={review.username}
      time={review.date}
    />
  ));

  const loadedElements = loadedReviews.map((review) => (
    <LoadedReviewItem
      description={review.description}
      username={review.username}
      time={review.date}
    />
  ));
  return (
    <div className="px-5 pt-5 bg-white">
      <h1 className="text-3xl font-mono font-medium">Reviews:</h1>
      {localStorage.getItem("idToken") !== null && (
        <ReviewInput id={props.id} />
      )}
      <br />
      {submittedElements}
      {loadedElements}
    </div>
  );
}
