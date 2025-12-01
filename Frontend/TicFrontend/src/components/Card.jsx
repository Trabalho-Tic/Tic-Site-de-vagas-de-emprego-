import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useApi from "../api/Api";

function Card({ vaga }) {
    const [empresa, setEmpresa] = useState("")
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        async function fetchVagas() {
            try {
                const response = await useApi({ endpoint: `/company/${vaga.id_company}` });
                setEmpresa(response);
            } catch (error) {
                console.error("Erro ao buscar vagas:", error);
            }
        }
    
        fetchVagas();
    }, []);
    
    return (
        <div onClick={() => navigate(`/vagas/${vaga.id}`)} className="flex cursor-pointer flex-col justify-between h-auto w-full md:w-90 lg:w-100 border-1 border-gray-400 p-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-green-300 hover:-translate-y-1">
            <div className="flex items-center gap-2 pb-4">
                <img className="h-10 w-10 rounded-4xl" src={empresa.logo} alt="" />
                <p className="text-sm text-gray-400">{empresa.nome}</p>
            </div>
            <p className="text-xl font-medium pb-2">{vaga.nome}</p>
            <p className="text-sm text-gray-500 pb-6">{vaga.cidade} - {vaga.pais} <span className="text-sm text-black font-medium">(On site)</span></p>
            <div onClick={(e) => e.stopPropagation()} className="flex gap-3">
                <button onClick={() => navigate(`/vagas/${vaga.id}`)} className="bg-green-200 text-sm text-green-400 px-3 py-1 rounded-3xl transition-all duration-400 hover:bg-green-500 hover:text-black font-medium">Ver mais</button>
                {
                    user.tipo == "empresa" ? (
                        <button onClick={() => navigate(`/candidaturasVaga/${vaga.id}`)} className="bg-green-200 text-sm text-green-400 px-3 py-1 rounded-3xl transition-all duration-400 hover:bg-green-500 hover:text-black font-medium">Ver Candidaturas</button>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}

export default Card