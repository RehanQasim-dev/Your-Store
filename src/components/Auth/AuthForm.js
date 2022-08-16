import { actions } from "../../store/index";
import { setLogin } from "../../store/reducer/AuthReducer";
import { useRef, useState } from "react";
import SignIn from "../Forms/SignIn";
import SignUp from "../Forms/SignUp";
import { useSelector, useDispatch } from "react-redux";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  function switchAuthModeHandler(event) {
    setIsLogin((old) => !old);
  }
  // const emailRef=useRef()
  // const passwordRef=useRef()

  // console.log(idToken)
  // function onSubmitHandler(event){
  //   event.preventDefault()
  //   const email=emailRef.current.value
  //   const password=passwordRef.current.value
  //   let url;
  //   if (!isLogin){
  //      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhS6VjzM2vWcX-VkV4vb9RGBmbV6GOrxA"
  //   }
  //   else {
  //      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhS6VjzM2vWcX-VkV4vb9RGBmbV6GOrxA'
  //   }
  //   const apiRequest=async ()=>{
  //       const response=await fetch(
  //         url,{
  //           method:'Post',
  //           body:JSON.stringify({
  //             email,
  //             password
  //           }),
  //           headers:{
  //             'content-type':'application/json'
  //           }})

  //         const data=await response.json()
  //         if (response.ok){
  //           authDispatch(setLogin({idToken:data.idToken,deadline:Date.now()+3000}))
  //         }
  //         else {
  //           throw new Error(data.error.message)
  //         }

  //   }
  //   apiRequest().catch((error)=>{
  //     alert(error)
  //   })
  // }

  return (
    <section className="table mx-auto bg-purple-100 px-12 py-7 mt-14 rounded-lg">
      {isLogin && (
        <>
          {" "}
          <SignIn />
          <p
            onClick={switchAuthModeHandler}
            className="mt-2 cursor-pointer table-center"
          >
            Sign Up
          </p>
        </>
      )}

      {!isLogin && (
        <>
          <SignUp />

          <p
            onClick={switchAuthModeHandler}
            className="mt-2 cursor-pointer table-center"
          >
            Sign In With Existing Account
          </p>
        </>
      )}
    </section>
  );
};

export default AuthForm;
