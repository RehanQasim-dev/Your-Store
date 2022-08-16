import React from 'react'
import './Input.css'
export default function Input(props){
    const val=props.inputStates.val
    const isTouched=props.inputStates.isTouched
    function changeHandler(event){
        props.setInputStates({val:event.target.value,isTouched:true})
    }
    console.log(val)
    const isNotvalid=val==="" && isTouched;
    function blurHandler(){
        props.setInputStates(old=>({...old,isTouched:true}))
    }
    const warning=(isNotvalid)?props.errorMessage:""
    console.log(props.isTouched)
  return (
    <div className="mb-2">
    <h2 className="text-lg font-medium mb-2">{props.title}</h2>
    <input onBlur={blurHandler} onChange={changeHandler} value={val} className="input pl-2 py-0.5 font-medium focus:bg-pink-200" type={props.type} />
    <br />
    <div className="text-red-600 h-4">{warning}</div>
    </div>

  )
}
