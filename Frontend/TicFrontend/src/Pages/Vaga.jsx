import React from "react";
import VagaDescricao from "../components/VagaDescricao";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";

function Vaga() {

    const { id } = useParams()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <Header />

            <div className="flex flex-col w-full gap-10 justify-center items-center py-10">
                <h1 className="text-4xl font-semibold">Venha conhecer melhor a Vaga</h1>
                {(user.tipo === "admin" || user.tipo === "empresa") && (
                    <button onClick={() => navigate(`/updateVaga/${id}`)} className="w-full md:w-100 text-lg font-semibold text-white bg-gradient-to-tr from-green-400 to-green-100 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5">Editar vaga</button>
                )}
            </div>
            
            <div className="w-auto border mx-20 border-gray-300 p-10 rounded-xl shadow-sm bg-white">
                <VagaDescricao />
            </div>
        </>
    )
}

export default Vaga