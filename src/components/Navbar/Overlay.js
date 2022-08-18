import React from "react";
import { useSelector } from "react-redux";
import Overlay_item from "./Overlay_item";
import "./Overlay.css";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
export default function Overlay(props) {
  const cartItems = useSelector((state) => state.Cart);
  const [showForm, setShowForm] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  function total_amount(total, i) {
    return total + cartItems[i].price * parseInt(cartItems[i].quantity);
  }
  function showFormHandler(event) {
    setShowForm(true);
  }
  function setIsConfirmedHandler(event) {
    setIsConfirmed(true);
  }
  console.log(isConfirmed);

  return (
    <>
      {/* black curtain */}
      <div className=" overlay absolute h-full w-full"></div>

      {isConfirmed && (
        <div
          style={{ top: `${window.innerHeight / 2 + window.scrollY}px` }}
          className=" bg-white p-5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-xl"
        >
          <h1 className="text-2xl font-medium">Submitted!!!!</h1>
          <button
            onClick={props.cancel_handler}
            className=" table ml-auto font-medium bg-transparent  text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 rounded-xl text-center"
          >
            close
          </button>
        </div>
      )}

      {!isConfirmed && (
        <>
          {/* Overlay Box  */}
          <div
            style={{ top: `${window.innerHeight / 2 + window.scrollY}px` }}
            className=" bg-white p-5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-xl"
          >
            <div className="overlay-box overflow-y-auto">
              {Object.keys(cartItems).map((i) => (
                <Overlay_item
                  title={cartItems[i].title}
                  price={cartItems[i].price}
                  amount={cartItems[i].quantity}
                />
              ))}
            </div>

            {/* Price box and submission */}
            <div className=" bg-white price flex justify-between mt-3">
              <div id="left_price_section">
                <h1 className="text-2xl font-bold"> Total Amount</h1>
              </div>

              <div id="right_price_section">
                <h1 className="table text-xl font-bold ml-auto mb-3">
                  {Object.keys(cartItems).reduce(total_amount, 0).toFixed(2)}
                </h1>
                {!showForm && (
                  <>
                    <button
                      onClick={props.cancel_handler}
                      className=" font-medium bg-transparent  text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 rounded-xl text-center mr-3 "
                    >
                      close
                    </button>
                    <button
                      className=" font-medium bg-transparent  text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 rounded-xl text-center "
                      onClick={showFormHandler}
                    >
                      Order
                    </button>
                  </>
                )}
              </div>
            </div>
            {showForm && (
              <Form
                cancel_handler={props.cancel_handler}
                setIsConfirmedHandler={setIsConfirmedHandler}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
