import React, { useState, useEffect } from "react"
import useApi from "../api/Api";
import Header from "../components/Header"
import Footer from "../components/Footer";
import Input from "../components/input"
import Card from "../components/Card";
import CardCompanies from "../components/CardCompanies";
import { Search } from "lucide-react";
import frame from "../assets/Frame 569.png"
import notes from "../assets/Frame 568.png"
import check from "../assets/Frame 570.png"
import dollar from "../assets/Frame 571.png"
import bg from "../assets/backgroundhome.png";

function Vagas() {
    const [vagas, setVagas] = useState([])
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        async function fetchVagas() {
            try {
                const vaga = await useApi({ endpoint: "/vaga" });
                setVagas(vaga);
                const companies = await useApi({ endpoint: "/company"})
                setCompanies(companies)
            } catch (error) {
                console.error("Erro ao buscar vagas:", error);
            }
        }

        fetchVagas();
    }, []);


    return (
        <>
            <Header />
            
            <section className="bg-gradient-to-t to-white from-gray-100 sm:px-0 lg:px-25 py-15 flex flex-col items-center">
                <p className="text-3xl text-center font-semibold px-1 pb-6">Vagas abertas recentemente</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        vagas.map((vaga, index) => ( 
                            index < 6 ? (
                                <Card vaga={vaga} />
                            ) : (
                                <></>
                            )
                        ))
                    }
                </div>
            </section>
            <section className="hidden lg:flex flex-col justify-center items-center py-20 px-10 lg:px-40 text-center bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
                {/* Overlay para contraste */}
                <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold text-white mb-14 leading-snug">Concluiu a graduação ou está buscando oportunidades?</h2>

                    <div className="grid grid-cols-4 gap-10">
                        <div className="flex flex-col items-center gap-5">
                            <img className="w-20" src={frame} alt="Ilustração representativa de nova vaga"/>
                            <p className="text-lg text-white font-semibold">Iniciar nova jornada profissional</p>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <img className="w-20" src={notes} alt="Ilustração representativa de nova vaga"/>
                            <p className="text-lg text-white font-semibold">Configure seu curriculo</p>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <img className="w-20" src={check} alt="Ilustração representativa de nova vaga"/>
                            <p className="text-lg text-white font-semibold">Inclusão para PCDs</p>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <img className="w-20" src={dollar} alt="Ilustração representativa de nova vaga"/>
                            <p className="text-lg text-white font-semibold">Busque melhorias salariais</p>
                        </div>
                    </div>
                </div>
                </section>
            <section className="flex flex-col py-14 justify-center border-t-1 items-center bg-gradient-to-t from-white to-gray-200">
                <p className="text-3xl font-semibold pb-12">As Empresas</p>
                <div className="grid md:grid-cols-4 gap-5">
                    {
                        companies.map((com) => (
                            <CardCompanies empresa={com} />
                        ))
                    }
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Vagas