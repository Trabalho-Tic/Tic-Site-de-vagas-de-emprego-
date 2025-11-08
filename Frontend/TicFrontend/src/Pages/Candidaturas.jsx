import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../api/Api";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Candidaturas() {

    const [candidaturas, setCandidaturas] = useState([])
    const { id } = useParams()

    useEffect(() => {
        async function fetchCandidatutras() {
            try {
                const response = await useApi({
                    endpoint: `/listarPorCandidato/${id}`
                })

                setCandidaturas(response)
            } catch(error) {
                console.error(error)
            }
        }

        fetchCandidatutras()
    }, [])

    return (
        <>
            <Header />

            <section className="flex flex-col items-center justify-center p-15">
                <h2 className="text-3xl text-center font-semibold px-1 pb-6">Minhas candidaturas</h2>
                {candidaturas?.length === 0 ? (
                    <p>Nenhuma candidatura encontrada.</p>
                ) : (
                    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {candidaturas?.map((vaga) => (
                            <Card vaga={vaga.vaga}/>
                        ))}
                    </ul>
                )}
            </section>

            <Footer />
        </>
    )
}

export default Candidaturas