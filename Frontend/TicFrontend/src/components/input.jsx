import React from "react";

function Input(props) {
    return (
        <input className="bg-white border-2 px-6 rounded-lg text-black text-sm w-80 md:w-100 h-15" placeholder={props.placeholder}></input>
    )
}

export default Input