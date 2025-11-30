import React, { useState, useEffect } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate } from "react-router-dom";

export default function CriarVagaInformacoes() {
  const [nome, setNome] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [modelo, setModelo] = useState("presencial");
  const [salario, setSalario] = useState("");
  const [atuacao, setAtuacao] = useState("");
  const [idCompany, setIdCompany] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function buscarEmpresa() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const empresas = await useApi({ endpoint: "/company" });
      const minhaEmpresa = empresas.find((c) => c.id_user === user.id);

      if (minhaEmpresa) setIdCompany(minhaEmpresa.id);
    }

    buscarEmpresa();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const vaga = await useApi({
      endpoint: "/vaga/create",
      method: "POST",
      body: {
        nome,
        pais,
        cidade,
        modelo,
        salario,
        atuacao,
        id_company: idCompany,
      },
    });

    navigate(`/criarVaga/requisitos/${vaga.id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg border border-gray-200 rounded-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold">Informações da vaga</h2>

        <Input label="Título da vaga" value={nome} onChange={(e) => setNome(e.target.value)} required />

        <Input label="País" value={pais} onChange={(e) => setPais(e.target.value)} required />

        <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />

        <Input label="Faixa salarial" value={salario} onChange={(e) => setSalario(e.target.value)} required />

        <Input label="Área de atuação" value={atuacao} onChange={(e) => setAtuacao(e.target.value)} required />

        <div className="flex flex-col">
          <label className="font-medium mb-1">Modelo</label>
          <select
            className="border border-gray-300 rounded-md px-4 h-[55px]"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          >
            <option value="presencial">Presencial</option>
            <option value="híbrido">Híbrido</option>
            <option value="remoto">Remoto</option>
          </select>
        </div>

        <button className="h-[48px] w-full bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium">
          Continuar
        </button>
      </form>
    </div>
  );
}
