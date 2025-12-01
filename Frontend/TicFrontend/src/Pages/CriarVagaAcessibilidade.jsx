import React, { useEffect, useState } from "react";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function CriarVagaAcessibilidade() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [acessibilidades, setAcessibilidades] = useState([]);
  const [selected, setSelected] = useState([]);
  const [semAcessibilidade, setSemAcessibilidade] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carrega acessibilidades do banco
  useEffect(() => {
    async function load() {
      try {
        const data = await useApi({ endpoint: "/acessibilidade" });
        setAcessibilidades(data);
      } catch (error) {
        console.error("Erro ao carregar acessibilidades:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleSelect = (id) => {
    // Se clicar em qualquer acessibilidade, desmarca a opção "sem acessibilidade"
    if (semAcessibilidade) setSemAcessibilidade(false);

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      // Caso a vaga não tenha acessibilidades → segue direto
      if (semAcessibilidade || selected.length === 0) {
        return navigate(`/criarVaga/resumo/${id}`);
      }

      // Salvar a lista selecionada
      await useApi({
        endpoint: `/vagaAcessibilidade/${id}`,
        method: "POST",
        body: {
          acessibilidades: selected,
        },
      });

      navigate(`/criarVaga/resumo/${id}`);
    } catch (error) {
      console.error("Erro ao salvar acessibilidade:", error);
      alert("Erro ao salvar acessibilidades da vaga.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando acessibilidades...
      </div>
    );
  }

  const nenhumaOpcao = acessibilidades.length === 0;

  return (
    <div className="flex justify-center min-h-screen bg-white py-10 px-5">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-lg p-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Acessibilidades da Vaga
        </h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Marque todas as acessibilidades que sua vaga oferece. Isso ajuda o
          sistema a recomendar sua vaga para candidatos com necessidades
          específicas de forma mais assertiva.
        </p>

        {nenhumaOpcao ? (
          <div className="text-center text-gray-600 py-10 border rounded-xl bg-gray-50">
            <p className="font-medium">
              Nenhuma acessibilidade cadastrada no sistema.
            </p>
            <p className="text-sm mt-1">
              Você pode continuar sem selecionar acessibilidades.
            </p>
          </div>
        ) : (
          <>
            {/* Checkbox "Nenhuma acessibilidade específica" */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                checked={semAcessibilidade}
                onChange={(e) => {
                  setSemAcessibilidade(e.target.checked);
                  if (e.target.checked) setSelected([]); // limpa seleção
                }}
                className="w-5 h-5 text-purple-600"
              />
              <label className="text-gray-800 text-sm">
                Minha vaga não possui acessibilidades específicas
              </label>
            </div>

            {/* Lista de acessibilidades */}
            {!semAcessibilidade && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {acessibilidades.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => toggleSelect(acc.id)}
                    className={`p-4 text-left rounded-xl border text-sm transition ${
                      selected.includes(acc.id)
                        ? "bg-purple-600 text-white border-purple-700"
                        : "bg-gray-50 border-gray-300 hover:border-purple-400"
                    }`}
                  >
                    <span className="font-semibold">{acc.descricao}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Botão continuar */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleSubmit}
            className="h-[48px] px-10 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] 
                       text-white rounded-lg font-medium disabled:opacity-60"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
