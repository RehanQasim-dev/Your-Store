import React, { useEffect } from "react";
import useApi from "../../hooks/useApi";
import "./Form.css";
import axios from "axios";
import Input from "./Input";
const requestSignUp = (body) => {
  return axios.post("http://127.0.0.1:8000/auth/users/", body);
};
let response;
export default function (props) {
  const [firstNameStates, setFirstNameStates] = React.useState({
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
  response = useApi(requestSignUp);
  console.log(response.data);
  function submitHandler(event) {
    event.preventDefault();
    response.request({
      first_tname: firstNameStates.val,
      last_name: lastNameStates.val,
      username: userNameStates.val,
      email: emailStates.val,
      password: passwordStates.val,
    });
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
