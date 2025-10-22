import React from "react";
import { useParams } from "react-router-dom";

function EmpresaVagas() {
  const { id } = useParams();
  const vagas = [
    {
      id: 1,
      titulo: "Desenvolvedor Frontend",
      local: "São Paulo, SP",
      tipo: "CLT",
      descricao: "Responsável por desenvolver interfaces modernas e responsivas.",
    },
    {
      id: 2,
      titulo: "Analista de Dados",
      local: "Remoto",
      tipo: "PJ",
      descricao: "Análise de dados e geração de relatórios estratégicos.",
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Vagas na Empresa</h1>

      {vagas.map((vaga) => (
        <div
          key={vaga.id}
          className="border border-gray-300 rounded-md p-6 mb-6 shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">{vaga.titulo}</h2>
          <p className="text-gray-600 mb-1">📍 {vaga.local}</p>
          <p className="text-gray-600 mb-3">💼 Tipo: {vaga.tipo}</p>
          <p className="text-gray-700 mb-4">{vaga.descricao}</p>
        </div>
      ))}
    </div>
  );
}

export default EmpresaVagas;
