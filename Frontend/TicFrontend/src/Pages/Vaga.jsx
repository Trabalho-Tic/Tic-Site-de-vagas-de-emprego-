import React, { useState, useEffect} from "react";
import { Search, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header"
import Input from "../components/input"
import Card from "../components/Card";
import VagaDescricao from "../components/VagaDescricao";
import Footer from "../components/Footer"
import useApi from "../api/Api";

function Vaga() {

    const [vagas, setVagas] = useState([])
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        function user() {
            const user = JSON.parse(localStorage.getItem("user"))
            if (!user) {
                navigate("/login")
            } else {
                setUser(user)
            }
        }

        user()
    }, [])

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
        <section className="flex flex-col items-center gap-10 py-10 border-b-1 border-gray-300">
            <p className="text-4xl">Procure por um Job</p>
            <div className="flex flex-col items-center md:flex-row gap-5 lg:w-200">
                <Input placeholder="Procure pela Vaga"></Input>
                <Input placeholder="Procure pela Localização"></Input>
                <button className="w-15 items-center bg-gradient-to-t from-gray-50 to-gray-500 p-5 rounded-4xl transition-all duration-400 shadow-xl hover:-translate-y-1"><Search size={20} /></button>
            </div>
        </section>
        <section className="flex flex-col w-full md:px-27 md:py-5 gap-6">
            {
                user.tipo == "empresa" 
                    ? <button onClick={() => navigate("/criarVaga")} className="text-xl font-semibold text-white bg-gradient-to-tr from-green-400 to-green-100 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5">Adicionar vaga</button>
                    : <></>
            }
            <div className="flex w-full gap-6">
                <div className="hidden lg:flex flex-col gap-2">
                    {
                        vagas.map((vaga) => (
                            <Card vaga={vaga} />
                        ))
                    }
                </div>
                <div className="w-full border-1 border-gray-300 p-10">
                    <VagaDescricao />
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Vaga