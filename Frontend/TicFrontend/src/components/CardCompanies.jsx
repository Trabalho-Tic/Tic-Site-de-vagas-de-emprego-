import React from "react";
import logo from "../assets/js moderno.webp";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CardCompanies(props) {
  const navigate = useNavigate();
  const companyId = 1;

  const handleSobreClick = () => {
    navigate(`/empresa/${companyId}/sobre`);
  };

  const handleVerMaisClick = () => {
    navigate(`/empresa/${companyId}/vagas`);
  };

  return (
    <div className="flex flex-col h-auto w-70 p-6 border border-gray-300 rounded-sm items-center shadow-lg transition-all duration-300 hover:shadow-purple-300 hover:-translate-y-1">
      <img className="h-26 w-26 rounded-full" src={logo} alt="" />
      <div className="flex justify-between gap-10 py-6">
        <p className="text-lg font-semibold">NAVA Company</p>
        <p className="flex gap-1 font-medium text-sm items-center">
          <Star className="text-yellow-300" /> 3.4
        </p>
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium pb-3 text-gray-700">
          10.000 a 100.000 empregados
        </p>
        <p className="text-sm font-medium pb-4 text-gray-700">
          6.988.877 Seguidores
        </p>
        <p className="text-sm font-medium pb-6 text-gray-400">
          Taxa de recomendação de 74% nos últimos 2 anos
        </p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={handleSobreClick}
          className="text-sm text-purple-400 px-4 py-2 rounded-3xl border border-purple-400 transition duration-300 hover:bg-purple-500 hover:text-white font-medium"
        >
          Sobre
        </button>

        <button
          onClick={handleVerMaisClick}
          className="bg-purple-100 text-sm text-purple-400 px-4 py-2 rounded-3xl transition duration-300 hover:bg-purple-500 hover:text-white font-medium"
        >
          Ver mais
        </button>
      </div>
    </div>
  );
}

export default CardCompanies;
