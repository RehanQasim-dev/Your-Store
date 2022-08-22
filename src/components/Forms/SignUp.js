import React, { useEffect } from "react";
import useApi from "../../hooks/useApi";
import "./Form.css";
import axios from "axios";
import Input from "./Input";
import useApiLite from "../../hooks/useApiLite";
const requestSignUp = (body) => {
  return axios.post("http://127.0.0.1:8000/auth/users/", body);
};
const postCustomer = (body) => {
  return axios.post("http://127.0.0.1:8000/store/Customers/", body);
};
export default function (props) {
  const [firstNameStates, setFirstNameStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [phoneStates, setPhoneStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [dateStates, setDateStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [lastNameStates, setLastNameStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [emailStates, setEmailStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [userNameStates, setUserNameStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [passwordStates, setPasswordStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const userResponse = useApiLite(requestSignUp);
  const customerResponse = useApiLite(postCustomer);
  console.log(userResponse.error);
  console.log(customerResponse.error);
  async function submitHandler(event) {
    event.preventDefault();
    await userResponse.request({
      first_name: firstNameStates.val,
      last_name: lastNameStates.val,
      username: userNameStates.val,
      email: emailStates.val,
      password: passwordStates.val,
    });
    await customerResponse.request({
      phone: phoneStates.val,
      birth_date: dateStates.val,
      user: userResponse.data.current.id,
    });
    console.log(userResponse.data);
    console.log(customerResponse.data);
  }

  const isDisabled = (inputStates) =>
    !inputStates.isTouched || inputStates.val == "";
  const submitDisable =
    isDisabled(firstNameStates) ||
    isDisabled(lastNameStates) ||
    isDisabled(emailStates) ||
    isDisabled(passwordStates);
  return (
    <form onSubmit={submitHandler}>
      <Input
        title={"First Name"}
        inputStates={firstNameStates}
        setInputStates={setFirstNameStates}
        type="text"
        errorMessage="Enter Valid Name"
        Input
      />
      <Input
        title={"Last Name"}
        inputStates={lastNameStates}
        setInputStates={setLastNameStates}
        type="text"
        errorMessage="Enter Valid Name"
        Input
      />
      <Input
        title={"User Name"}
        inputStates={userNameStates}
        setInputStates={setUserNameStates}
        type="text"
        errorMessage="Enter Valid Username"
        Input
      />
      <Input
        title={"Email"}
        inputStates={emailStates}
        setInputStates={setEmailStates}
        type="email"
        errorMessage="Enter Valid Email"
        Input
      />
      <Input
        title={"phone"}
        inputStates={phoneStates}
        setInputStates={setPhoneStates}
        type="tel"
        errorMessage="Enter Valid Number"
        Input
      />
      <Input
        title={"Birth Date"}
        inputStates={dateStates}
        setInputStates={setDateStates}
        type="date"
        errorMessage=""
        Input
      />
      <Input
        title={"Password"}
        inputStates={passwordStates}
        setInputStates={setPasswordStates}
        type="password"
        errorMessage="Enter Valid Password"
        Input
      />
      <button className={`${submitDisable ? "disable" : ""} btn table-center`}>
        Create Account
      </button>
      {/* <div className="table ml-auto">
        <button onClick={props.cancel_handler} className="font-medium bg-transparent  text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 py-0.5 rounded-2xl text-center mr-2">Cancel</button>
        <button onClick={props.setIsConfirmedHandler} className={`${submitDisable?'disable':''} font-medium bg-transparent  text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 py-0.5 rounded-2xl text-center`} disabled={submitDisable}>Confirm</button>
        </div> */}
    </form>
  );
}
