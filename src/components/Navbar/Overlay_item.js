import React from "react";
import "./Overlay_item.css";
import "./context";
import { cartActions } from "../../store/Slices/CartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import useApiLite from "../../hooks/useApiLite";
const postChangedQuantity = (id, body) => {
  return axios.patch(
    `http://127.0.0.1:8000/store/Carts/${localStorage.getItem(
      "cartId"
    )}/Items/${id}/`,
    body
  );
};
const deleteItem = (id) => {
  return axios.delete(
    `http://127.0.0.1:8000/store/Carts/${localStorage.getItem(
      "cartId"
    )}/Items/${id}/`
  );
};
export default function Overlay_item(props) {
  const changedQuantityResponse = useApiLite(postChangedQuantity);
  const deleteItemResponse = useApiLite(deleteItem);
  const cartDispatch = useDispatch();
  async function add(event) {
    await changedQuantityResponse.request(props.id, {
      quantity: props.quantity + 1,
    });
    cartDispatch(cartActions.addItemToCart({ id: props.id, quantity: +1 }));
  }

  async function subtract(event) {
    if (props.quantity === 1) {
      console.log("quantity is one");
      await deleteItemResponse.request(props.id);
      cartDispatch(cartActions.removeItemfromCart({ id: props.id }));
    } else {
      await changedQuantityResponse.request(props.id, {
        quantity: props.quantity - 1,
      });
      cartDispatch(cartActions.addItemToCart({ id: props.id, quantity: -1 }));
    }
  }
  console.log(props.quantity);
  return (
    <>
      <div className="py-4 flex justify-between items-center">
        <div className="relative">
          <h1 className="text-xl font-bold">{props.title}</h1>
          <h2 className="text-xl inline font-bold text-amber-700">
            {props.price}
          </h2>
          <div className="amount inline text-xl font-bold px-2 rounded-md text-center absolute left-36">
            x{props.quantity}
          </div>
        </div>
        <div>
          <button
            onClick={subtract}
            className="text-xl font-black bg-transparent border-box text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 rounded-md text-center mr-3"
          >
            -
          </button>
          <button
            onClick={add}
            className="text-xl font-black bg-transparent border-box text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 rounded-md text-center "
          >
            +
          </button>
        </div>
      </div>
      <hr className="border-16 border-amber-700 " />
    </>
  );
}
