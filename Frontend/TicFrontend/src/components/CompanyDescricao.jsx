import React from "react";
import { Zap } from "lucide-react";

import imgGrande from "../assets/imgGrande.png"
import imgPequena from "../assets/imgPequena.png"
import imgPequena2 from "../assets/imgPequena2.png"
import imgPequena3 from "../assets/imgPequena3.png"
import imgPequena4 from "../assets/imgPequena4.png"
import logo from "../assets/js moderno.webp"


function CompanyDescricao() {

    return (
        <>
            <div className="flex items-center gap-2">
                <img className="h-34 rounded-4xl" src={logo} alt="" />
                <p>Meta Company</p>
            </div>
            <div className="flex justify-between items-center pt-4">
                <div className="flex flex-col">
                    <p className="text-2xl pb-3 font-bold">JS MODERN</p>
                    <p className="text-sm font-medium text-gray-600">Porto, Portugal (On site)</p>
                </div>
                <button className="flex text-lg rounded-4xl items-center px-6 h-12 gap-2 font-semibold transition-all duration-500 hover:-translate-y-1 hover:bg-green-300"><Zap size={20} />Easy Apply</button>
            </div>
            <nav className="pt-15 pb-8 overflow-x-auto">
                <nav className="flex items-center gap-10 border-b-1 border-gray-400">
                    <a href="#descricao" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Descrição</a>
                    <a href="#requisicoes" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Requisições</a>
                    <a href="#beneficios" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Beneficios</a>
                    <a href="#visaoGeral" className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500">Visão geral</a>
                </nav>
            </nav>
        </>
    )

}

export default CompanyDescricao