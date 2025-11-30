import React, { useEffect, useState } from "react";
import useApi from "../api/Api";
import { useParams, useNavigate } from "react-router-dom";

export default function CriarVagaResumo() {
  const { id } = useParams();

  const [vaga, setVaga] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVaga() {
      const data = await useApi({
        endpoint: `/vaga/${id}`,
      });
      setVaga(data);
    }
    fetchVaga();
  }, [id]);

  if (!vaga) return <p>Carregando...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl p-10 border rounded-xl space-y-6">

        <h2 className="text-3xl font-semibold">Resumo da vaga</h2>

        <div className="space-y-2">
          <h3 className="text-xl font-medium">{vaga.nome}</h3>
          <p className="text-gray-700">{vaga.cidade} — {vaga.pais}</p>
          <p className="text-gray-700 capitalize">{vaga.modelo}</p>
        </div>

        <hr />

        {/* Requisitos */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Requisitos</h3>

          <p className="font-medium">Conhecimentos obrigatórios:</p>
          <ul className="list-disc ml-5">
            {vaga.requisicao?.conhecimentos?.map((c, i) => <li key={i}>{c}</li>)}
          </ul>

          <p className="font-medium mt-3">Diferenciais:</p>
          <ul className="list-disc ml-5">
            {vaga.requisicao?.destaque?.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>

        <hr />

        {/* Processo */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Processo Seletivo</h3>
          <p><strong>Etapas:</strong> {vaga.processo?.processoSeletivo}</p>
          <p><strong>Entrevistador:</strong> {vaga.processo?.entrevistador}</p>
          <p><strong>Time:</strong> {vaga.processo?.time}</p>
        </div>

        <hr />

        {/* Acessibilidades */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Acessibilidades</h3>
          <ul className="list-disc ml-5">
            {vaga.acessibilidades?.map((a) => (
              <li key={a.id}>{a.descricao}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => navigate("/vagas")}
          className="h-[48px] w-full bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium"
        >
          Publicar Vaga
        </button>
      </div>
    </div>
  );
}
