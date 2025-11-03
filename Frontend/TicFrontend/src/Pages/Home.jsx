import React, { useState, useEffect } from "react"
import useApi from "../api/Api";
import Header from "../components/Header"
import Footer from "../components/Footer";
import Input from "../components/input"
import Card from "../components/Card";
import CardCompanies from "../components/CardCompanies";
import { Search } from "lucide-react";
import frame from "../assets/Frame 569.png"
import bg from "../assets/backgroundhome.png";

function Vagas() {
    const [vagas, setVagas] = useState([])

    useEffect(() => {
        async function fetchVagas() {
            try {
                const vaga = await useApi({ endpoint: "/vaga" });
                setVagas(vaga);
            } catch (error) {
                console.error("Erro ao buscar vagas:", error);
            }
        }

        fetchVagas();
    }, []);


    return (
        <>
            <Header />
            <section className="flex flex-col justify-center items-center gap-10 pt-10">
                <p className="text-4xl">Procure por um Job</p>
                <div className="flex flex-col items-center lg:flex-row gap-5 lg:w-200">
                    <Input placeholder="Procure pela Vaga"></Input>
                    <Input placeholder="Procure pela Localização"></Input>
                    <button className="w-15 items-center bg-gradient-to-t from-gray-50 to-gray-500 p-5 rounded-4xl transition-all duration-400 shadow-xl hover:-translate-y-1"><Search size={20} /></button>
                </div>
            </section>
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
            <section 
                className="hidden lg:flex flex-col justify-center items-center lg:py-10 lg:px-40 h-auto filter grayscale bg-cover"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <p className="pb-14 text-3xl font-semibold text-white">Do you finished your graduated or just try find a job?</p>
                <div className="flex justify-center gap-22">
                    <div className="flex flex-col items-center gap-6">
                        <img className="w-22" src={frame} alt="" />
                        <p className="text-xl text-white font-medium">Enter in a new Job</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <img className="w-22" src={frame} alt="" />
                        <p className="text-xl text-white font-medium">Enter in a new Job</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <img className="w-22" src={frame} alt="" />
                        <p className="text-xl text-white font-medium">Enter in a new Job</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <img className="w-22" src={frame} alt="" />
                        <p className="text-xl text-white font-medium">Enter in a new Job</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col py-14 justify-center border-t-1 items-center bg-gradient-to-t from-white to-gray-200">
                <p className="text-3xl font-semibold pb-12">The Companies</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <CardCompanies />
                    <CardCompanies />
                    <CardCompanies />
                    <CardCompanies />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Vagas