import React from "react";
import Input from "../components/Forms/Input";
import TextArea from "../components/Forms/TextArea";
import Radio from "../components/Forms/Radio";
import { useRef } from "react";
import useApiLite from "../hooks/useApiLite";
import axios from "axios";
const postOrder = (body, idToken) => {
  return axios.post("http://127.0.0.1:8000/store/Orders/", body, {
    headers: { Authorization: `JWT ${idToken}` },
  });
};
export default function PlaceOrder() {
  const ref1 = useRef(false);
  const ref2 = useRef(false);
  const ref3 = useRef(false);
  const messageRef = useRef();
  const orderResponse = useApiLite(postOrder);
  const [adressStates, setAdressStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [messageStates, setMessageStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [paymentMethodStates, setPaymentMethodStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const submitHandler = async (event) => {
    await orderResponse.request(
      {
        address: adressStates.val,
        message: messageRef.current.value,
        payment_method: "Cash On Delivery",
        cart_id: localStorage.getItem("cartId"),
      },
      localStorage.getItem('idToken')
    );
  };
  console.log("error", orderResponse.error);
  const isDisabled = (inputStates) =>
    !inputStates.isTouched || inputStates.val == "";
  const submitDisable =
    isDisabled(adressStates) ||
    !(ref1.current.checked || ref2.current.checked || ref3.current.checked);
  return (
    <div className="bg-zinc-200 w-3/4 mt-7 flex flex-col mx-auto gap-3 p-5 rounded-lg">
      <TextArea
        title={"Address:"}
        inputStates={adressStates}
        setInputStates={setAdressStates}
        type="textarea"
        errorMessage="Address cannot be empty"
        Input
      />
      <div>
        <label htmlFor="message">Message:</label>
        <br />
        <textarea
          ref={messageRef}
          rows={3}
          id="message"
          className="input pl-2 py-0.5 font-medium focus:bg-pink-200 w-4/5 mt-2"
        ></textarea>
      </div>
      <h2>Payment Method:</h2>
      <div className="flex justify-between ">
        <Radio
          ref={ref1}
          title="Cash On Delivery"
          name="payment"
          id="On Delivery"
        ></Radio>
        <Radio
          ref={ref2}
          title="Easypaisa/Jazzcash"
          name="payment"
          id="Easypaisa/Jazzcash"
        ></Radio>
        <Radio
          ref={ref3}
          title="Bank Transfer"
          name="payment"
          id="Bank"
        ></Radio>
      </div>
      <button
        className={`${submitDisable ? "disable" : ""}  btn table-center mt-3`}
        disabled={submitDisable}
        onClick={submitHandler}
      >
        Place Order
      </button>
    </div>
  );
}
