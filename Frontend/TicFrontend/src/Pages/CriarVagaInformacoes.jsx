import React, { useState, useEffect } from "react";
import useApi from "../api/Api";
import { useNavigate } from "react-router-dom";

export default function CriarVagaInformacoes() {
  const [nome, setNome] = useState("");
  const [pais, setPais] = useState("Brasil");
  const [cidade, setCidade] = useState("");
  const [modelo, setModelo] = useState("presencial");
  const [idCompany, setIdCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Buscar empresa vinculada ao usuário logado
  useEffect(() => {
    async function buscarEmpresa() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const empresas = await useApi({ endpoint: "/company" });
        const minhaEmpresa = empresas.find((c) => c.id_user === user.id);

        if (minhaEmpresa) setIdCompany(minhaEmpresa.id);
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
      }
    }

    buscarEmpresa();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      if (!idCompany) {
        alert("Não foi possível identificar a empresa logada.");
        return;
      }

      if (!nome.trim()) {
        alert("Dê um título para a vaga (ex: Desenvolvedor Backend Júnior).");
        return;
      }

      if (!cidade.trim()) {
        alert("Informe a cidade da vaga.");
        return;
      }

      const vaga = await useApi({
        endpoint: "/Vaga/create",
        method: "POST",
        body: {
          nome,
          pais,
          cidade,
          modelo,
          id_company: idCompany,
        },
      });

      // Próximo passo: requisitos / benefícios / processo
      navigate(`/criarVaga/requisitos/${vaga.id}`);
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      alert("Erro ao criar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg border border-gray-200 rounded-2xl p-10 space-y-8"
      >
        {/* Stepper simples */}
        <div className="text-sm text-gray-500 font-medium">
          Passo <span className="text-purple-600">1</span> de 4 ·{" "}
          <span className="font-semibold text-gray-700">
            Informações da vaga
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Sobre a oportunidade
          </h2>
          <p className="text-sm text-gray-600">
            Comece definindo o básico da vaga. Nas próximas etapas você vai
            detalhar requisitos, benefícios e acessibilidades pensadas para
            pessoas com deficiência.
          </p>
        </div>

        {/* Título da vaga */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">
            Título da vaga <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 h-[48px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Ex: Desenvolvedor Backend Júnior"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <span className="text-xs text-gray-500">
            Esse será o nome exibido para candidatos na listagem de vagas.
          </span>
        </div>

        {/* Local da vaga */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              País <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 h-[48px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Ex: Brasil"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Cidade <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 h-[48px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Ex: São Paulo, Belo Horizonte..."
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <span className="text-xs text-gray-500">
              Se a vaga for remota, informe a cidade-base da empresa.
            </span>
          </div>
        </div>

        {/* Modelo de trabalho */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">
            Modelo de trabalho <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                value: "presencial",
                label: "Presencial",
                desc: "Trabalho no escritório / local físico.",
              },
              {
                value: "híbrido",
                label: "Híbrido",
                desc: "Parte presencial, parte remoto.",
              },
              {
                value: "remoto",
                label: "100% remoto",
                desc: "Trabalho totalmente à distância.",
              },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setModelo(option.value)}
                className={`border rounded-lg p-3 text-left text-sm transition ${
                  modelo === option.value
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-purple-300"
                }`}
              >
                <div className="font-semibold text-gray-900">
                  {option.label}
                </div>
                <div className="text-xs text-gray-600">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="h-[48px] px-10 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Continuar"}
          </button>
        </div>
      </form>
    </div>
  );
}
