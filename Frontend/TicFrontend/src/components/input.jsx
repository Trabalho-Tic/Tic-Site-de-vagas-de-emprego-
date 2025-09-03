import React from "react";

function Input(props) {
    return (
        <input
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            className="bg-white border-2 px-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-120 h-15"
            placeholder={props.placeholder}
        ></input>
    )
}

export default Input