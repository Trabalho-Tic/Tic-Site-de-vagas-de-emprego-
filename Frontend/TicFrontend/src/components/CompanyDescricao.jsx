import React, { useState } from "react";
import { Zap } from "lucide-react";
import logo from "../assets/js moderno.webp";

function CompanyDescricao() {
  const [abaAtiva, setAbaAtiva] = useState("descricao");

  const renderConteudo = () => {
    switch (abaAtiva) {
      case "descricao":
        return (
          <p className="pt-4">
            Esta é a descrição da vaga JS Moderno na Meta Company.
          </p>
        );
      case "requisicoes":
        return (
          <p className="pt-4">
            Requisitos: experiência com JavaScript moderno, React e APIs REST.
          </p>
        );
      case "beneficios":
        return (
          <p className="pt-4">
            Benefícios: plano de saúde, vale-refeição, bônus anual.
          </p>
        );
      case "visaoGeral":
        return (
          <p className="pt-4">
            Visão geral: vaga presencial em Porto, Portugal, com foco em
            frontend.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <img className="h-34 rounded-4xl" src={logo} alt="" />
        <p>Meta Company</p>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex flex-col">
          <p className="text-2xl pb-3 font-bold">JS MODERNO</p>
          <p className="text-sm font-medium text-gray-600">
            Porto, Portugal (Presencial)
          </p>
        </div>
        <button className="flex text-lg rounded-4xl items-center px-6 h-12 gap-2 font-semibold transition-all duration-500 hover:-translate-y-1 hover:bg-green-300">
          <Zap size={20} />
          Candidatura Fácil
        </button>
      </div>

      <nav className="pt-10 pb-8 overflow-x-auto">
        <div className="flex items-center gap-10">
          <button
            onClick={() => setAbaAtiva("descricao")}
            className={`text-lg font-semibold pb-1 transition-all duration-300 ${
              abaAtiva === "descricao"
                ? "text-purple-600 underline"
                : "hover:text-gray-500"
            }`}
          >
            Descrição
          </button>
          <button
            onClick={() => setAbaAtiva("requisicoes")}
            className={`text-lg font-semibold pb-1 transition-all duration-300 ${
              abaAtiva === "requisicoes"
                ? "text-purple-600 underline"
                : "hover:text-gray-500"
            }`}
          >
            Requisições
          </button>
          <button
            onClick={() => setAbaAtiva("beneficios")}
            className={`text-lg font-semibold pb-1 transition-all duration-300 ${
              abaAtiva === "beneficios"
                ? "text-purple-600 underline"
                : "hover:text-gray-500"
            }`}
          >
            Benefícios
          </button>
          <button
            onClick={() => setAbaAtiva("visaoGeral")}
            className={`text-lg font-semibold pb-1 transition-all duration-300 ${
              abaAtiva === "visaoGeral"
                ? "text-purple-600 underline"
                : "hover:text-gray-500"
            }`}
          >
            Visão geral
          </button>
        </div>
      </nav>

      <div className="pt-2">{renderConteudo()}</div>
    </>
  );
}

export default CompanyDescricao;
