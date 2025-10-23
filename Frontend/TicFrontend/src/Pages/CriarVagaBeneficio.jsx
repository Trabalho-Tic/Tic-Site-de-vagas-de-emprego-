import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

function CriarVagaBeneficio() {
    const { id } = useParams()
    const [salario, setSalario] = useState("")
    const [beneficio, setBeneficio] = useState("")
    const [beneficios, setBeneficios] = useState([])
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
                endpoint: `/vagaBeneficio/${id}`,
                method: "POST",
                body: { salario, beneficios },
            });

            navigate(`/criarVaga/Processo/${id}`);
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
      <h2 className="text-2xl font-semibold text-black mb-2">
        Benefício
      </h2>

      {/* Salário */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Salário
        </label>
        <Input
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
          placeholder="Salário"
          type="number"
          className="border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Adicionar benefício */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-800 mb-1">
          Adicione um benefício para sua vaga
        </label>
        <div className="flex gap-3">
          <Input
            value={beneficio}
            onChange={(e) => setBeneficio(e.target.value)}
            placeholder="Exemplo: Vale-alimentação, plano de saúde..."
            className="flex-1 border border-gray-300 h-[83px] rounded-md px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleAddBeneficio}
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de benefícios adicionados */}
      <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
        {beneficios.length > 0 ? (
          <ul className="list-disc ml-5 space-y-1 break-words">
            {beneficios.map((b, index) => (
              <li key={index}>{b}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">Nenhum benefício adicionado ainda.</p>
        )}
      </div>

      {/* Botão principal */}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 h-[48px] w-[123px] bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed self-start"
      >
        {loading ? "Criando..." : "Criar"}
      </button>
    </form>
  </div>
);
}

export default CriarVagaBeneficio