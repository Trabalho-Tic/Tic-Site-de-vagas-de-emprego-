import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../api/Api";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CandidaturasVaga() {

    const [candidaturas, setCandidaturas] = useState([])
    const [vagas, setVagas] = useState([])

    const user = JSON.parse(localStorage.getItem("user"))

    console.log(user)

    useEffect(() => {
        async function fetchVagas() {
        try {
            if (!user) return;

            if (user.tipo === "empresa") {
                // Buscar empresa vinculada ao usuário
                const empresas = await useApi({ 
                    endpoint: "/company" 
                });
                const minhaEmpresa = empresas.find((c) => c.id_user === user.id);

                if (minhaEmpresa) {
                    // Buscar vagas só da empresa logada
                    const vagasEmpresa = await useApi({
                        endpoint: `/vaga/empresa/${minhaEmpresa.id}`,
                    });

                    console.log(vagasEmpresa)
                    setVagas(vagasEmpresa);
                }

            } else {
            // Se for candidato → todas as vagas
                const todas = await useApi({ endpoint: "/vaga" });
                setVagas(todas);
            }
        } catch (error) {
            console.error("Erro ao buscar vagas:", error);
        }
        }

        fetchVagas();
    }, []);

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
                <h2 className="text-3xl text-center font-semibold px-1 pb-6">Minhas Vagas abertas</h2>
                {vagas?.length === 0 ? (
                    <p>Nenhuma vaga encontrada.</p>
                ) : (
                    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {vagas?.map((vaga) => (
                            <Card vaga={vaga} rota={false} />
                        ))}
                    </ul>
                )}
            </section>

            <Footer />
        </>
    )
}

export default CandidaturasVaga