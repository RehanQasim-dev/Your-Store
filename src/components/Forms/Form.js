import React from 'react'
import "./Form.css"
import Input from './Input'
export default function(props) {
    const [nameStates,setNameStates]=React.useState({val:'',isTouched:false})
    const [emailStates,setEmailStates]=React.useState({val:'',isTouched:false})
    function confirm_order_handler(event){
        console.log('submitted')
    }

    const isDisabled=(inputStates)=>(!inputStates.isTouched || inputStates.val=="")
    const submitDisable=isDisabled(nameStates) || isDisabled(emailStates)
    return (
    <div>
        <Input title={'Name'} inputStates={nameStates} setInputStates={setNameStates} type='text' errorMessage='Enter Valid Name' Input/>
        <Input title={'Email'} inputStates={emailStates} setInputStates={setEmailStates} type='email' errorMessage='Enter Valid Email' Input/>
        <div className="table ml-auto">
        <button onClick={props.cancel_handler} className="font-medium bg-transparent  text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 py-0.5 rounded-2xl text-center mr-2">Cancel</button>
        <button onClick={props.setIsConfirmedHandler} className={`${submitDisable?'disable':''} font-medium bg-transparent  text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 py-0.5 rounded-2xl text-center`} disabled={submitDisable}>Confirm</button>
        </div>
    </div>
  )
}
