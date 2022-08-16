import React from 'react'
import "./Overlay_item.css"
import "./context"
import context from './context'
export default function Overlay_item(props) {
  let ctx=React.useContext(context)
  function add(event){
    ctx.set_cartitems(old=>{
      return {'amount':old.amount+1,
      'list':old.list.map((item)=>{
        if (item.name===props.name){
          return {...item,'amount':parseInt(item.amount)+1}
        }
        return item
      })}})
  }
  
function subtract(event){
  ctx.set_cartitems(old=>{
    return {'amount':old.amount-1,
    'list':old.list.flatMap((item)=>{
      if (item.name===props.name){
        return (item.amount!=1)?[{...item,'amount':parseInt(item.amount)-1}]:[]
      }
      return [item]
    })}})
}
  console.log(props.amount)
  return (
    <>
    <div className="py-4 flex justify-between items-center">
    <div className="relative">
        <h1 className="text-xl font-bold">{props.name}</h1>
        <h2 className="text-xl inline font-bold text-amber-700">{props.price}</h2>
        <div className="amount inline text-xl font-bold px-2 rounded-md text-center absolute left-36">x{props.amount}</div>

    </div>
    <div>       
      <button onClick={subtract} className="text-xl font-black bg-transparent border-box text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 rounded-md text-center mr-3">-</button>
      <button onClick={add} className="text-xl font-black bg-transparent border-box text-amber-700 border-amber-700 border-2 hover:bg-amber-700 hover:text-white px-5 rounded-md text-center ">+</button>
    </div>
    </div>
    <hr className="border-16 border-amber-700 "/>
    </>
    
  )
}
