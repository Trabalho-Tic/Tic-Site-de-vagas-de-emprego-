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

        const tipo = data.find((t) => String(t.id) === String(idTipo));
        if (tipo?.subtipos) {
          setSubtipos(tipo.subtipos);
        }
      } catch (error) {
        console.error("Erro ao carregar subtipos:", error);
      }
    }
    fetchSubtipos();
  }, [idTipo]);

  const toggleSubtipo = (id) => {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleFinish = async () => {
    try {
      await useApi({
        endpoint: `/candidato/${id_user}/subtipos`,
        method: "POST",
        body: { subtipos: selecionados }
      });

      navigate("/login");

    } catch (error) {
      console.error("Erro ao salvar subtipos:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl text-center space-y-10">

        <div>
          <h1 className="text-3xl font-bold">Selecione os subtipos</h1>
          <p className="text-gray-600">Escolha apenas os que se aplicam a você.</p>
        </div>

        <div className="space-y-4">

          {subtipos.map((sub) => {
            const ativo = selecionados.includes(sub.id);

            return (
              <div
                key={sub.id}
                className={`
                  p-5 rounded-xl border flex justify-between items-center
                  transition-all cursor-pointer
                  ${ativo ? "border-green-500 bg-green-50" : "border-gray-300 bg-white hover:border-green-400"}
                `}
                onClick={() => toggleSubtipo(sub.id)}
              >
                <span className="text-lg">{sub.nome}</span>

                {/* Checkbox isolado e controlado pelo React */}
                <input
                  type="checkbox"
                  checked={ativo}
                  readOnly
                  className="h-5 w-5 accent-green-500 cursor-pointer"
                />
              </div>
            );
          })}

        </div>

        <button
          onClick={handleFinish}
          disabled={selecionados.length === 0}
          className="px-10 py-3 bg-green-400 rounded-lg text-black font-semibold disabled:opacity-40 hover:opacity-90 transition"
        >
          Concluir
        </button>
      </div>
    </section>
  );
}
