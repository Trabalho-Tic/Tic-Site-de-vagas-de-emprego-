// src/pages/SelecionarTipo.jsx
import React, { useEffect, useState } from "react";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function SelecionarTipo() {
  const [tipos, setTipos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const navigate = useNavigate();
  const { id_user } = useParams();

  useEffect(() => {
    async function fetchTipos() {
      try {
        const data = await useApi({ endpoint: "/TipoDeficiencia" });
        setTipos(data);
      } catch (error) {
        console.error("Erro ao buscar tipos:", error);
      }
    }
    fetchTipos();
  }, []);

  const handleNext = () => {
    if (!selecionado) return;
    navigate(`/selecionar-subtipos/${id_user}?tipo=${selecionado}`);
  };

  return (
    <section className="flex flex-col items-center py-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-3">Qual tipo de deficiência você possui?</h1>
      <p className="text-gray-600 mb-10">Escolha o tipo que melhor representa você.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {tipos.map((tipo) => (
          <button
            key={tipo.id}
            onClick={() => setSelecionado(tipo.id)}
            className={`
              flex flex-col items-center p-6 rounded-xl border transition-all
              ${selecionado === tipo.id
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-white hover:border-green-400"}
            `}
          >
            {/* Titulo */}
            <span className="font-medium text-lg">{tipo.nome}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selecionado}
        className="mt-10 px-10 py-3 bg-green-400 rounded-lg text-black font-medium disabled:opacity-50"
      >
        Próximo
      </button>
    </section>
  );
}
