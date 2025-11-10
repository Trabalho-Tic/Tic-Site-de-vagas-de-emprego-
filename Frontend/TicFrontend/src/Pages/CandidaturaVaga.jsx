import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../api/Api";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CandidaturasVaga() {

    const [candidatos, setCandidatos] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        async function fetchCandidatutras() {
            try {
                const response = await useApi({
                    endpoint: `/listarPorVaga/${id}`
                })

                console.log(response)

                setCandidatos(response)
            } catch(error) {
                console.error(error)
            }
        }

        fetchCandidatutras()
    }, [])

    return (
        <>
            <Header />

            <section className="flex flex-col items-center justify-center px-6 py-16 w-full">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 w-full">
                Minhas Vagas Abertas
                </h2>

                {candidatos?.length === 0 ? (
                    <p className="text-gray-500 text-lg">Nenhum candidato encontrada.</p>
                ) : (
                    <ul className="flex flex-col gap-6 w-full max-w-6xl">
                        {candidatos?.map((candidato) => (
                        <li
                            className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                            {/* Esquerda: informações da vaga */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img
                                    src={candidato.candidato.user.foto}
                                    alt="Foto"
                                    className="w-12 h-12 object-contain"
                                />
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {candidato.candidato.user.nome || "Título da Vaga"}
                                    </h3>
                                    <p className="text-gray-600">
                                        {candidato.candidato.user.telefone} - {candidato.candidato.user.email}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {candidato.candidato.cidade + " - " + candidato.candidato.estado}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-4">
                                <button 
                                    onClick={() => navigate(`/viewCurriculo/${candidato.candidato.user.id}`)} 
                                    className="px-5 py-2.5 bg-emerald-100 text-emerald-700 font-medium rounded-full hover:bg-emerald-200 transition-all">
                                    Ver Curriculo
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                )}
            </section>

            <Footer />
        </>
    )
}

export default CandidaturasVaga