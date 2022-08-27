import React from "react";
import { useDispatch } from "react-redux";
import useApiLite from "../../hooks/useApiLite";
import { reviewActions } from "../../store/Slices/ReviewSlice";
import axios from "axios";
const postReview = (product_id, body) => {
  return axios.post(
    `http://localhost:8000/store/Products/${product_id}/Review/`,
    body,
    {
      headers: { Authorization: `JWT ${localStorage.getItem("idToken")}` },
    }
  );
};
export default function ReviewInput(props) {
  const [input, setInput] = React.useState("");
  const response = useApiLite(postReview);
  const Dispatch = useDispatch();
  const submitHandler = async (event) => {
    event.preventDefault();
    await response.request(props.id, { description: input });
    Dispatch(reviewActions.addReview(response.data.current));
  };

  const isDisabled = input === "";
  return (
    <form className="mx-auto mt-3" onSubmit={submitHandler}>
      <textarea
        onChange={(event) => setInput(event.target.value)}
        value={input}
        type="text"
        rows={3}
        className="focus:outline-zinc-800 bg-zinc-100 text-lg font-medium pl-3 w-full"
      />
      <button
        className={`${
          isDisabled ? "" : ""
        } table text-white text-xl bg-zinc-700 hover:bg-zinc-800 px-2 ml-auto`}
        disabled={isDisabled}
      >
        Submit
      </button>
    </form>
  );
}
