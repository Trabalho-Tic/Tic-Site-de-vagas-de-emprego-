import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/js moderno.webp"

function Card({ vaga }) {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate("/vagas")} className="h-auto w-full md:w-90 lg:w-100 border-1 border-gray-400 p-4 rounded-sm shadow-lg transition-all duration-300 hover:shadow-green-300 hover:-translate-y-1">
            <div className="flex items-center gap-2 pb-4">
                <img className="h-10 w-10 rounded-4xl" src={Logo} alt="" />
                <p className="text-sm text-gray-400">Meta Company</p>
            </div>
            <p className="text-xl font-medium pb-2">{vaga.nome}</p>
            <p className="text-sm text-gray-500 pb-6">Porto, Portugal <span className="text-sm text-black font-medium">(On site)</span></p>
            <div onClick={(e) => e.stopPropagation()} className="flex gap-3">
                <button onClick={() => navigate("/inscreve")} className="text-sm text-green-400 px-3 py-1 rounded-3xl border-1 border-green-400 transition-all duration-400 hover:bg-green-500 hover:text-black font-medium">Enviar Candidatura</button>
                <button onClick={() => navigate("/vagas")} className="bg-green-200 text-sm text-green-400 px-3 py-1 rounded-3xl transition-all duration-400 hover:bg-green-500 hover:text-black font-medium">View More</button>
            </div>
        </div>
    )
}

export default Card