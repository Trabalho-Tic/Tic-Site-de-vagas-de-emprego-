import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function CriarVagaRequisitos() {
  const { id } = useParams();

  const [conhecimento, setConhecimento] = useState("");
  const [conhecimentos, setConhecimentos] = useState([]);

  const [destaque, setDestaque] = useState("");
  const [destaques, setDestaques] = useState([]);

  const [processo, setProcesso] = useState("");
  const [entrevistador, setEntrevistador] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const addConhecimento = (e) => {
    e.preventDefault();
    if (!conhecimento.trim()) return;
    setConhecimentos((prev) => [...prev, conhecimento]);
    setConhecimento("");
  };

  const addDestaque = (e) => {
    e.preventDefault();
    if (!destaque.trim()) return;
    setDestaques((prev) => [...prev, destaque]);
    setDestaque("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await useApi({
      endpoint: `/vagaRequisicao/${id}`,
      method: "POST",
      body: {
        conhecimentos,
        destaque: destaques,
        processoSeletivo: processo,
        entrevistador,
        time,
      },
    });

    navigate(`/criarVaga/acessibilidade/${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <form className="w-full max-w-xl bg-white shadow-lg border border-gray-200 rounded-xl p-8 space-y-6"
            onSubmit={handleSubmit}>

        <h2 className="text-2xl font-semibold">Requisitos</h2>

        {/* Conhecimentos */}
        <div>
          <label className="font-medium mb-1 block">Conhecimentos obrigatórios</label>
          <div className="flex gap-2">
            <Input value={conhecimento} onChange={(e) => setConhecimento(e.target.value)} placeholder="Ex: Node.js" />
            <button className="px-4 h-[48px] bg-indigo-600 text-white rounded-md" onClick={addConhecimento}>Add</button>
          </div>

          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
            {conhecimentos.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        {/* Destaques */}
        <div>
          <label className="font-medium mb-1 block">Diferenciais</label>
          <div className="flex gap-2">
            <Input value={destaque} onChange={(e) => setDestaque(e.target.value)} placeholder="Ex: Experiência em IA" />
            <button className="px-4 h-[48px] bg-indigo-600 text-white rounded-md" onClick={addDestaque}>Add</button>
          </div>

          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
            {destaques.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>

        {/* Processo seletivo */}
        <Input label="Como funciona o processo seletivo?" value={processo} onChange={(e) => setProcesso(e.target.value)} />

        <Input label="Entrevistador" value={entrevistador} onChange={(e) => setEntrevistador(e.target.value)} />

        <Input label="Time" value={time} onChange={(e) => setTime(e.target.value)} />

        <button className="h-[48px] w-full bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium">
          Continuar
        </button>
      </form>
    </div>
  );
}
