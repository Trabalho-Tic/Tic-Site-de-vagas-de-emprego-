import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

function CriarVagaProcesso() {
    const { id } = useParams()
    const [processo, setProcesso] = useState("")
    const [entrevistador, setEntrevistador] = useState("")
    const [time, setTime] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleAddBeneficio = (event) => {
        event.preventDefault();

        if (beneficio.trim() === "") return;

        setBeneficios([...beneficios, beneficio]);
        setBeneficio("");
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (loading) return;

        try {
            setLoading(true);

            const data = await useApi({
                endpoint: `/vagaProcesso/${id}`,
                method: "POST",
                body: { salario, beneficios },
            });

            navigate(`/criarVaga/requisito/${id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
  return (
  <div className="flex justify-center items-center min-h-screen bg-white">
    <form
      onSubmit={handleLogin}
      className="flex flex-col w-[600px] bg-white border border-gray-200 rounded-xl shadow-md p-10 gap-6"
    >
      {/* Título */}
      <h2 className="text-2xl font-semibold text-black mb-2">Processo</h2>

      {/* Campo - Como funciona o processo seletivo */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Como funciona o processo seletivo
        </label>
        <Input
          value={processo}
          onChange={(e) => setProcesso(e.target.value)}
          placeholder="Descreva como funciona o processo seletivo"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Campo - Entrevistador */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Entrevistador
        </label>
        <Input
          value={entrevistador}
          onChange={(e) => setEntrevistador(e.target.value)}
          placeholder="Nome do entrevistador"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Campo - Time */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Quem será seu time na vaga?
        </label>
        <Input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Informe os integrantes do time"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Botão Criar */}
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
export default CriarVagaProcesso