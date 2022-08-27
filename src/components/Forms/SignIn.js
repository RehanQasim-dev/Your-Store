import React, { useEffect } from "react";
import "./Form.css";
import Input from "./Input";
import useApi from "../../hooks/useApi";
import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoginn } from "../../store/Slices/AuthSlice";
const requestSignIn = (body) => {
  return axios.post("http://127.0.0.1:8000/auth/jwt/create/", body);
};
let response;
export default function (props) {
  const initialRender = useRef(true);
  const [userNameStates, setUserNameStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [passwordStates, setPasswordStates] = React.useState({
    val: "",
    isTouched: false,
  });
  const [indicator, setIndicator] = React.useState(false);
  const authDispatch = useDispatch();
  response = useApi(requestSignIn);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      authDispatch(
        setLoginn({
          idToken: response.data.access,
          deadline: Date.now() + 300000000,
        })
      );
    }
  }, [response.data.access]);

  console.log(response.data.access);
  function submitHandler(event) {
    event.preventDefault();
    response.request({
      username: userNameStates.val,
      password: passwordStates.val,
    });
    setIndicator((old) => !old);
  }
  const isDisabled = (inputStates) =>
    !inputStates.isTouched || inputStates.val == "";
  const submitDisable =
    isDisabled(userNameStates) || isDisabled(passwordStates);
  return (
    <form onSubmit={submitHandler}>
      <Input
        title={"Username"}
        inputStates={userNameStates}
        setInputStates={setUserNameStates}
        type="text"
        errorMessage="Enter Valid Username"
        Input
      />
      <Input
        title={"Password"}
        inputStates={passwordStates}
        setInputStates={setPasswordStates}
        type="password"
        errorMessage="Enter Valid password"
        Input
      />
      <button
        className={`${submitDisable ? "disable" : ""}  btn table-center`}
        disabled={submitDisable}
      >
        Login
      </button>
    </form>
  );
}
