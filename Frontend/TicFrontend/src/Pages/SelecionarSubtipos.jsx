// src/pages/SelecionarSubtipos.jsx
import React, { useEffect, useState } from "react";
import useApi from "../api/Api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function SelecionarSubtipos() {
  const [subtipos, setSubtipos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [params] = useSearchParams();
  const { id_user } = useParams();
  const navigate = useNavigate();

  const idTipo = params.get("tipo");

  useEffect(() => {
    async function fetchSubtipos() {
      try {
        const data = await useApi({ endpoint: "/TipoDeficiencia" });

        const tipoAchado = data.find((t) => t.id === idTipo);

        if (tipoAchado?.subtipos) {
          setSubtipos(tipoAchado.subtipos);
        }
      } catch (error) {
        console.error("Erro ao buscar subtipos:", error);
      }
    }
    fetchSubtipos();
  }, [idTipo]);

  const toggleSubtipo = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    try {
      await useApi({
        endpoint: `/candidato/${id_user}/subtipos`,
        method: "POST",
        body: { subtipos: selecionados },
      });

      navigate("/dashboard-candidato");
    } catch (error) {
      console.error("Erro ao salvar subtipos:", error);
    }
  };

  return (
    <section className="flex flex-col items-center py-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-3">Agora selecione os subtipos</h1>
      <p className="text-gray-600 mb-10">
        Isso ajuda a identificar quais acessibilidades são essenciais.
      </p>

      <div className="w-full max-w-2xl space-y-4">
        {subtipos.map((sub) => (
          <label
            key={sub.id}
            className={`
              flex items-center p-5 rounded-xl border cursor-pointer transition-all
              ${selecionados.includes(sub.id)
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-400"}
            `}
          >
            <input
              type="checkbox"
              checked={selecionados.includes(sub.id)}
              onChange={() => toggleSubtipo(sub.id)}
              className="h-5 w-5 mr-4"
            />
            <span className="text-lg">{sub.nome}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-4 mt-12">
        <button
          className="px-8 py-3 rounded-lg border"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>

        <button
          className="px-8 py-3 bg-green-400 text-black rounded-lg font-medium disabled:opacity-50"
          disabled={selecionados.length === 0}
          onClick={handleFinish}
        >
          Concluir
        </button>
      </div>
    </section>
  );
}
