import React, { useState, useEffect } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate } from "react-router-dom";

function CriarVaga() {

  const [nome, setNome] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [modelo, setModelo] = useState("presencial");
  const [idCompany, setIdCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔍 Busca automática da empresa vinculada ao usuário logado
  useEffect(() => {
    async function buscarEmpresa() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/login");
          return;

        }

        // Busca todas as empresas e filtra pela do usuário logado
        const empresas = await useApi({ endpoint: "/company" });
        const minhaEmpresa = empresas.find((c) => c.id_user === user.id);

        if (minhaEmpresa) {
          setIdCompany(minhaEmpresa.id);
        } else {
          console.warn("⚠️ Nenhuma empresa vinculada a este usuário.");
        }
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
      }
    }

    buscarEmpresa();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      if (!idCompany) {
        alert("Não foi possível identificar a empresa logada.");
        return;
      }

      const data = await useApi({
        endpoint: "/vaga/create",
        method: "POST",
        body: { nome, pais, cidade, modelo, id_company: idCompany },
      });

      navigate(`/criarVaga/beneficio/${data.id}`);
    } catch (err) {
      console.error("Erro ao criar vaga:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white md:py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full md:w-[600px] bg-white border border-gray-200 rounded-xl shadow-md p-10 gap-6"
      >
        <h2 className="text-2xl font-semibold text-black mb-2">
          Criar Vaga
        </h2>

        {/* Nome da vaga */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Nome da Vaga
          </label>
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da vaga"
            className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* País */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1">
            País da Vaga
          </label>
          <Input
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            placeholder="Exemplo: Brasil"
            className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Cidade */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Cidade da Vaga
          </label>
          <Input
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Exemplo: Varginha - MG"
            className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Modelo (select) */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Modelo da Vaga
          </label>
          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="presencial">Presencial</option>
            <option value="híbrido">Híbrido</option>
            <option value="remoto">Remoto</option>
          </select>
        </div>

        {/* Campo oculto com o ID da empresa */}
        <input type="hidden" value={idCompany} readOnly />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 h-[48px] w-[123px] bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed self-start"
        >
          {loading ? "Criando..." : "Criar"}
        </button>
      </form>
    </div>
  );
}

export default CriarVaga;
