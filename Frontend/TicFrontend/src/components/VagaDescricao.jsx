import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../api/Api";

import { Zap } from "lucide-react";

import imgGrande from "../assets/imgGrande.png"
import imgPequena from "../assets/imgPequena.png"
import imgPequena2 from "../assets/imgPequena2.png"
import imgPequena3 from "../assets/imgPequena3.png"
import imgPequena4 from "../assets/imgPequena4.png"

import logo from "../assets/js moderno.webp"

function VagaDescricao() {
    const { id } = useParams()
    const [vaga, setVaga] = useState([])
    const [empresa, setEmpresa] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchVagas() {
            try {
                const result = await useApi({ endpoint: `/vaga/${id}` });
                setVaga(result);
                console.log(result)
                
                if (result?.id_company) {
                    const response = await useApi({ endpoint: `/company/${result.id_company}` });
                    setEmpresa(response);
                }
            } catch (error) {
                console.error("Erro ao buscar vagas:", error);
            }
        }
    
        fetchVagas();
    }, [id]);

    if (!vaga || !vaga.id) {
        return <p>Carregando vaga...</p>;
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <img className="h-8 w-8 rounded-4xl" src={empresa.logo} alt="" />
                <p>{empresa.nome}</p>
            </div>
            <div className="flex justify-between items-center pt-4">
                <div className="flex flex-col">
                    <p className="text-2xl pb-3 font-bold max-w-150">{vaga.nome}</p>
                    <p className="text-sm font-medium text-gray-600">{vaga.cidade}, {vaga.pais} (On site)</p>
                </div>
                <button onClick={() => navigate("/curriculo")} className="flex text-lg rounded-4xl items-center px-6 h-12 gap-2 font-semibold bg-green-400 transition-all duration-500 hover:-translate-y-1 hover:bg-green-300"><Zap size={20} />Candidatar-se</button>
            </div>
            <div className="flex flex-col pt-14">
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Modelo de vaga:</span> {vaga.modelo}</p>
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Processo seletivo:</span> {vaga.processo.processoSeletivo}</p>
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Entrevistador:</span> {vaga.processo.entrevistador}</p>
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Seu time:</span> {vaga.processo.time}</p>
            </div>
            <nav className="pt-15 pb-8 overflow-x-auto">
                <nav className="flex items-center gap-10 border-b-1 border-gray-400">
                    <a href="#descricao" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Descrição</a>
                    <a href="#requisicoes" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Requisições</a>
                    <a href="#beneficios" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Beneficios</a>
                    <a href="#visaoGeral" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Visão geral</a>
                </nav>
            </nav>
            <section id="descricao" className="border-b-1 border-gray-400">
                <p className="text-xl font-medium text-gray-400 pb-6">Descrição</p>
                <p className="text-lg font-bold pb-3">O que te espera: </p>
                <ul className="pl-5 pb-10">
                    {
                        vaga.descricao.descricao.map((desc) => (
                            <li className="list-disc text-sm font-medium pb-2">{desc}</li>
                        ))
                    }
                </ul>
            </section>
            <section id="requisicoes" className="flex flex-col gap-8 pt-10 border-b-1 border-gray-400">
                <p className="text-xl font-medium text-gray-400">Requisições</p>
                <div>
                    <p className="text-lg font-bold pb-3">O que você vai fazer:</p>
                    <p className="text-sm font-medium leading-6">{vaga.requisicao.atuacao}</p>
                </div>
                <div>
                    <p className="text-lg font-bold pb-3">Requisitos e qualificações:</p>
                    <ul className="pl-5 pb-3">
                        {
                            vaga.requisicao.conhecimentos.map((conhecimento) => (
                                <li className="list-disc text-sm font-medium">{conhecimento}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <p className="text-lg font-bold pb-3">Se destaca se souber:</p>
                    <ul className="pl-5 pb-10">
                        {
                            vaga.requisicao.destaque.map((dest) => (
                                <li className="list-disc text-sm font-medium">{dest}</li>
                            ))
                        }                    </ul>
                </div>
            </section>
            <section id="beneficios" className="flex flex-col gap-6 pt-10 border-b-1 border-gray-400">
                <p className="text-xl font-medium text-gray-400 ">Beneficios</p>
                <div>
                    <p className="text-lg font-semibold pb-3">Base Salarial:</p>
                    <p className="text-xl font-semibold">{vaga.beneficio.salario} <span className="text-sm font-medium text-gray-400">Por/Mês</span></p>
                </div>
                <div>
                    <p className="text-lg font-bold pb-3">Oque temos a lhe oferecer:</p>
                    <ul className="pl-5 pb-10">
                        {
                            vaga.beneficio.beneficios.map((beneficio) => (
                                <li className="list-disc text-sm font-medium">{beneficio}</li>
                            ))
                        }
                    </ul>
                </div>
            </section>
            <section id="visaoGeral" className="flex justify-center gap-4 pt-10">
                <img src={imgGrande} alt="" />
                <div className="grid grid-cols-2 gap-4">
                    <img src={imgPequena} alt="" />
                    <img src={imgPequena2} alt="" />
                    <img src={imgPequena3} alt="" />
                    <img src={imgPequena4} alt="" />
                </div>
            </section>
        </>
    )
}

export default VagaDescricao