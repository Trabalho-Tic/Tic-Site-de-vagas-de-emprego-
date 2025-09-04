import React from "react";

function Select(props) {
    return (
        <select
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            className="bg-white border-2 px-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-auto h-15"
            placeholder={props.placeholder}
        >
            <option value="candidato">Candidato</option>
            <option value="empresa">Empresa</option>
        </select>
    )
}

export default Select