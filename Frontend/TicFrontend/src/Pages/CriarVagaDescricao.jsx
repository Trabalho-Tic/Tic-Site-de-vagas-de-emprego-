import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

function CriarVagaDescricao() {
    const { id } = useParams()
    const [descricao, setDescricao] = useState("")
    const [descricaos, setDescricaos] = useState([])
    const [validacao, setValidacao] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleAddDescricao = (event) => {
        event.preventDefault();

        if (descricao.trim() === "") return;

        setDescricaos([...descricaos, descricao]);
        setDescricao("");
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (loading) return;

        try {
            setLoading(true);

            const data = await useApi({
                endpoint: `/vagaDescricao/${id}`,
                method: "POST",
                body: { descricao: descricaos },
            });

            setValidacao(true)

            setTimeout(() => {
                setValidacao(false)
                navigate(`/`);
            }, 2000)

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
        {validacao && (
            <p className="absolute py-6 px-10 shadow-2xl rounded-xl text-white bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] font-medium">
            Salvo com sucesso
            </p>
        )}
        <form
        onSubmit={handleLogin}
        className="flex flex-col w-[600px] bg-white border border-gray-200 rounded-xl shadow-md p-10 gap-6"
        >
        {/* Título */}
        <h2 className="text-2xl font-semibold text-black mb-2">Descrição</h2>

        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800 mb-1">
                Adicione a descrição em topicos sobre a vaga
            </label>
            <div className="flex gap-3">
                <Input
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Exemplo: Você contribuira no desenvolvimento de software"
                    className="flex-1 border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleAddDescricao}
                >
                    Adicionar
                </button>
            </div>
        </div>

        <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
            {descricaos.length > 0 ? (
                <ul className="list-disc ml-5 space-y-1">
                    {descricaos.map((b, index) => (
                        <li key={index}>{b}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 italic">Nenhum benefício adicionado ainda.</p>
            )}
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
  )
}

export default CriarVagaDescricao