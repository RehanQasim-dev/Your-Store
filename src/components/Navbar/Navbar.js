import React, { useState } from "react";
import "./Navbar.css";
import cartlogo from "./cartlogo.svg";
import Overlay from "./Overlay";
import profilelogo from "./profile.svg";
import { useSelector } from "react-redux";
import { getCartItemsAmount } from "../../store/Slices/CartSlice";

export default function Navbar() {
  const [isclicked, set_isclicked] = useState(false);
  const cartItems = useSelector((state) => state.Cart);
  // console.log(cartIte);
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
      <div className="navbar bg-amber-700 flex  items-center mr-auto h-14">
        <h1 className="text-white xl:p-14 p-5 font-medium xl:text-2xl text-xl">
          ReactMeals
        </h1>

        <div
          onClick={cancel_handler}
          className={`${
            isAnimated && "button_animate"
          } cartbar bg-amber-900 flex items-center rounded-lg mr-5 ml-auto p-3 gap-2`}
        >
          <img src={cartlogo} alt="cartlogo" className="h-full" />
          <h3 className="custom-font text-white xl:text-xl text-md font-medium">
            Your Cart
          </h3>
          <div className="custom-font bg-amber-700 text-white rounded-full h-6 w-6 flex justify-center items-center text-xl font-medium">
            {getCartItemsAmount(cartItems)}
          </div>
        </div>
        <div className="profilelog xl:h-2/3 h-7 mr-5">
          <img src={profilelogo} alt="profilelogo" className="h-full" />
        </div>
      </div>
    </>
  );
}
