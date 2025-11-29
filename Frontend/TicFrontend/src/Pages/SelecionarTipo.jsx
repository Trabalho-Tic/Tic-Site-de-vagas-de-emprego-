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

  // ➕ Opção adicional manual (não existe no backend)
  const tiposExtras = [
    { id: "nenhuma", nome: "Nenhuma deficiência" }
  ];

  const handleNext = () => {
    if (!selecionado) return;

    // 👉 Caso “não possuo deficiência”
    if (selecionado === "nenhuma") {
      navigate("/login");
      return;
    }

    // 👉 Caso tipo real → manda para subtipos
    navigate(`/selecionar-subtipos/${id_user}?tipo=${selecionado}`);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl text-center space-y-8">

        {/* Título + descrição */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Queremos personalizar sua experiência
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Para recomendar vagas perfeitas para o seu perfil, precisamos entender
            qual tipo de deficiência representa você.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

          {/* Tipos vindos do backend */}
          {tipos.map((tipo) => (
            <button
              key={tipo.id}
              onClick={() => setSelecionado(tipo.id)}
              className={`
                p-5 rounded-xl border text-center transition-all
                ${
                  selecionado === tipo.id
                    ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                    : "border-gray-300 bg-white hover:border-green-400"
                }
              `}
            >
              <span className="font-medium">{tipo.nome}</span>
            </button>
          ))}

          {/* ➕ Botão da opção “Nenhuma deficiência” */}
          {tiposExtras.map((tipo) => (
            <button
              key={tipo.id}
              onClick={() => setSelecionado(tipo.id)}
              className={`
                p-5 rounded-xl border text-center transition-all
                ${
                  selecionado === tipo.id
                    ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                    : "border-gray-300 bg-white hover:border-green-400"
                }
              `}
            >
              <span className="font-medium">{tipo.nome}</span>
            </button>
          ))}

        </div>

        {/* Botão */}
        <div>
          <button
            onClick={handleNext}
            disabled={!selecionado}
            className="px-10 py-3 rounded-lg bg-green-400 text-black font-semibold disabled:opacity-40 hover:opacity-90 transition"
          >
            Próximo
          </button>
        </div>

        <p className="text-xs mt-2 text-gray-500">
          Essas informações são usadas apenas para personalizar suas vagas.
        </p>
      </div>
    </section>
  );
}