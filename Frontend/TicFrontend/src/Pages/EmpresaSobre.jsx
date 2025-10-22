import React from "react";
import { useParams } from "react-router-dom";

function EmpresaSobre() {
  const { id } = useParams();

  const empresa = {
    nome: "NAVA Company",
    descricao:
      "A NAVA é uma empresa de tecnologia focada em soluções digitais para grandes corporações.",
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sobre a {empresa.nome}</h1>

      <p className="text-gray-700 mb-6">{empresa.descricao}</p>
    </div>
  );
}

export default EmpresaSobre;
