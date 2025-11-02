import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate } from "react-router-dom";

function CriarVaga() {
    const [nome, setNome] = useState("")
    const [pais, setPais] = useState("")
    const [cidade, setCidade] = useState("")
    const [modelo, setModelo] = useState("")
    const [loading, setLoading] = useState(false)

    const company = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (loading) return;

        try {
            setLoading(true);

            const data = await useApi({
                endpoint: "/Vaga/create",
                method: "POST",
                body: { nome, pais, cidade, modelo, id_company: company.id },
            });

            console.log(data)

            navigate(`/criarVaga/beneficio/${data.id_company}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
   return (
  <div className="flex justify-center items-center min-h-screen bg-white md:py-10">
    <form
      onSubmit={handleLogin}
      className="flex flex-col w-full md:w-[600px] bg-white border border-gray-200 rounded-xl shadow-md p-10 gap-6"
    >
      <h2 className="text-2xl font-semibold text-black mb-2">
        Criar Vaga
      </h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Nome da Vaga
        </label>
        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome Da Vaga"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          País da Vaga
        </label>
        <Input
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          placeholder="País da vaga"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Cidade da Vaga
        </label>
        <Input
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Cidade da vaga: Exemplo - Franca - SP"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Modelo da Vaga
        </label>
        <Input
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          placeholder="Coloque o modelo da vaga"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

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
export default CriarVaga