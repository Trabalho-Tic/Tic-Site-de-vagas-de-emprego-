import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

function CriarVagaRequisicao() {
    const { id } = useParams()
    const [atuacao, setAtuacao] = useState("")
    const [conhecimento, setConhecimento] = useState("")
    const [conhecimentos, setConhecimentos] = useState([])
    const [destaque, setDestaque] = useState("")
    const [destaques, setDestaques] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleAddConhecimento = (event) => {
        event.preventDefault();

        if (conhecimento.trim() === "") return;

        setConhecimentos([...conhecimentos, conhecimento]);
        setConhecimento("");
    }
     
    const handleAddDestaque = (event) => {
        event.preventDefault();

        if (destaque.trim() === "") return;

        setDestaques([...destaques, destaque]);
        setDestaque("");
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (loading) return;

        try {
            setLoading(true);

            const data = await useApi({
                endpoint: `/vagarequisicao/${id}`,
                method: "POST",
                body: { atuacao, conhecimentos, destaque: destaques },
            });

            navigate(`/criarVaga/Descricao/${id}`);
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
        <h2 className="text-2xl font-semibold text-black mb-2">Requisição</h2>

        {/* Campo - Como funciona o processo seletivo */}
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800 mb-1">
                Qual sera a area de atuação do candidato
            </label>
            <Input
                value={atuacao}
                onChange={(e) => setAtuacao(e.target.value)}
                placeholder="Descreva qual sera a area de atuação do candidato"
                className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>

        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800 mb-1">
                Adicioane os conhecimentos exigidos
            </label>
            <div className="flex gap-3">
                <Input
                    value={conhecimento}
                    onChange={(e) => setConhecimento(e.target.value)}
                    placeholder="Exemplo: Node.js + anos de experiencia"
                    className="flex-1 border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleAddConhecimento}
                >
                    Adicionar
                </button>
            </div>
        </div>

        <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
            {conhecimentos.length > 0 ? (
                <ul className="list-disc ml-5 space-y-1">
                    {conhecimentos.map((b, index) => (
                        <li key={index}>{b}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 italic">Nenhum benefício adicionado ainda.</p>
            )}
        </div>
        
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800 mb-1">
                Adicione um destaque para o candidato se destacar
            </label>
            <div className="flex gap-3">
                <Input
                    value={destaque}
                    onChange={(e) => setDestaque(e.target.value)}
                    placeholder="Exemplo: Conhecimento em Ia, conhecimento em React Vite"
                    className="flex-1 border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleAddDestaque}
                >
                    Adicionar
                </button>
            </div>
        </div>

        <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
            {destaques.length > 0 ? (
            <ul className="list-disc ml-5 space-y-1">
                {destaques.map((b, index) => (
                    <li key={index}>{b}</li>
                ))}
            </ul>
            ) : (
                <p className="text-gray-400 italic">Nenhum benefício adicionado ainda.</p>
            )}
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
  )
}

export default CriarVagaRequisicao