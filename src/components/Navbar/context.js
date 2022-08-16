import React from "react";
const context=React.createContext({'cartitems':'','set_cartitems':false})
export default context;
export function Context(props){
    const [cartitems,set_cartitems]=React.useState({list:[],amount:0});
    return (
        <context.Provider value={{'cartitems':cartitems,"set_cartitems":set_cartitems}}>{props.children}</context.Provider>
    
    )
}