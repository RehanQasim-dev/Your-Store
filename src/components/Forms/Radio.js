import React from "react";
import { forwardRef } from "react";

const Radio = forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.id} className="mr-2">
        {props.title}
      </label>
      <input ref={ref} type="radio" id={props.id} name={props.name} />
    </div>
  );
});
export default Radio;
