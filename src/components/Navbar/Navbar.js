import React, { useState } from "react";
import "./Navbar.css";
import cartlogo from "./cartlogo.svg";
import Overlay from "./Overlay";
import { useSelector } from "react-redux";
import { getCartItemsAmount } from "../../store/Slices/CartSlice";
export default function Navbar() {
  const [isclicked, set_isclicked] = useState(false);
  const cartItems = useSelector((state) => state.Cart);
  function cancel_handler(event) {
    set_isclicked((old) => !old);
  }
  const [isAnimated, setIsAnimated] = React.useState(false);
  React.useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    setIsAnimated(true);
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [Object.keys(cartItems).length]);
  return (
    <>
      {isclicked && <Overlay cancel_handler={cancel_handler} />}
      <div className="navbar bg-amber-700 flex  justify-between items-center">
        <h1 className="custom-font text-white p-14 font-medium">ReactMeals</h1>

        <div
          onClick={cancel_handler}
          className={`${
            isAnimated && "button_animate"
          } cartbar bg-amber-900 flex items-center rounded-lg mr-14 p-3 gap-2`}
        >
          <img src={cartlogo} alt="cartlogo" className="h-full" />
          <h3 className="custom-font text-white text-xl font-medium">
            Your Cart
          </h3>
          <div className="custom-font bg-amber-700 text-white rounded-full h-6 w-6 flex justify-center items-center text-xl font-medium">
            {getCartItemsAmount(cartItems)}
          </div>
        </div>
      </div>
    </>
  );
}
