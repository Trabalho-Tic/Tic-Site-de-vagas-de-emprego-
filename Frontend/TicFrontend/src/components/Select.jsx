import React from "react";

function Select(props) {
    const categorias = [
        "Tecnologia",
        "Educação",
        "Saúde",
        "Comércio",
        "Indústria",
        "Serviços",
        "Financeiro",
        "Marketing",
        "Logística",
        "Jurídico",
        "Outros"
    ];

    return (
        <select
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            className="bg-white border-2 px-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-auto h-15"
            placeholder={props.placeholder}
        >
            {
                categorias.map((cat) => (
                    <option>{cat}</option>
                ))
            }
        </select>
    )
}

export default Select