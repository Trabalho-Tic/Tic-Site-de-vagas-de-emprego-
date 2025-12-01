// src/Pages/CriarVagaResumo.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../api/Api";

export default function CriarVagaResumo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega os dados completos da vaga
  useEffect(() => {
    async function fetchVaga() {
      try {
        const data = await useApi({
          endpoint: `/Vaga/${id}`, // <- V maiúsculo, igual às rotas
        });
        setVaga(data);
      } catch (err) {
        console.error("Erro ao carregar vaga:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVaga();
  }, [id]);

  const handlePublicar = async () => {
    try {
      await useApi({
        endpoint: `/Vaga/update/${id}`,
        method: "PUT",
        body: { publicado: true },
      });

      navigate("/home");
    } catch (err) {
      console.error("Erro ao publicar vaga:", err);
      alert("Erro ao publicar a vaga.");
    }
  };

  if (loading || !vaga) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Carregando resumo da vaga...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-white p-6">
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-xl shadow-md p-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Resumo da Vaga
        </h2>

        <p className="text-gray-600 mb-10">
          Confira todas as informações antes de publicar sua vaga. Caso algo
          esteja incorreto, você pode voltar nas etapas anteriores.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-inner">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {vaga.nome}
          </h3>

          <p className="text-gray-600 mb-6">
            {vaga.cidade} • {vaga.pais} • {vaga.modelo}
          </p>

          <div className="space-y-8">
            {/* Requisitos */}
            {vaga.requisicao && (
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Área de atuação
                </h4>
                <p className="text-gray-700 mb-4">
                  {vaga.requisicao.atuacao}
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Conhecimentos exigidos
                </h4>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {vaga.requisicao.conhecimentos?.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                  Destaques
                </h4>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {vaga.requisicao.destaque?.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefícios */}
            {vaga.beneficio && (
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Benefícios
                </h4>

                {vaga.beneficio.salario && (
                  <p className="text-gray-700 mb-4">
                    💰 <strong>Salário:</strong> R$ {vaga.beneficio.salario}
                  </p>
                )}

                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {vaga.beneficio.beneficios?.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Processo Seletivo */}
            {vaga.processo && (
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Processo Seletivo
                </h4>
                <p className="text-gray-700 mb-2">
                  {vaga.processo.processoSeletivo}
                </p>

                {vaga.processo.entrevistador && (
                  <p className="text-gray-700">
                    👤 <strong>Entrevistador:</strong>{" "}
                    {vaga.processo.entrevistador}
                  </p>
                )}

                {vaga.processo.time && (
                  <p className="text-gray-700">
                    👥 <strong>Time:</strong> {vaga.processo.time}
                  </p>
                )}
              </section>
            )}

            {/* Acessibilidades */}
            {vaga.acessibilidades && vaga.acessibilidades.length > 0 && (
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Acessibilidades da Vaga
                </h4>

                <div className="flex flex-wrap gap-2">
                  {vaga.acessibilidades.map((acc) => (
                    <span
                      key={acc.id}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-300"
                    >
                      {acc.descricao}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handlePublicar}
            className="h-[50px] px-10 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6]
                       text-white rounded-md font-medium text-lg hover:opacity-90 
                       transition disabled:opacity-60"
          >
            Publicar vaga
          </button>
        </div>
      </div>
    </div>
  );
}
