import React, { useState } from "react";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function CriarVagaRequisitos() {
  const { id } = useParams(); // id da vaga
  const navigate = useNavigate();

  // --- CAMPOS ---
  const [responsabilidades, setResponsabilidades] = useState("");
  const [requisito, setRequisito] = useState("");
  const [requisitos, setRequisitos] = useState([]);

  const [diferencial, setDiferencial] = useState("");
  const [diferenciais, setDiferenciais] = useState([]);

  const [salario, setSalario] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [beneficios, setBeneficios] = useState([]);

  const [processoTexto, setProcessoTexto] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);

  // --- FUNÇÕES DE ADD ---
  const addRequisito = (e) => {
    e.preventDefault();
    if (!requisito.trim()) return;
    setRequisitos((prev) => [...prev, requisito.trim()]);
    setRequisito("");
  };

  const addDiferencial = (e) => {
    e.preventDefault();
    if (!diferencial.trim()) return;
    setDiferenciais((prev) => [...prev, diferencial.trim()]);
    setDiferencial("");
  };

  const addBeneficio = (e) => {
    e.preventDefault();
    if (!beneficio.trim()) return;
    setBeneficios((prev) => [...prev, beneficio.trim()]);
    setBeneficio("");
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      // Validações mínimas necessárias
      if (!responsabilidades.trim()) {
        alert("Descreva as principais responsabilidades da vaga.");
        return;
      }

      if (requisitos.length === 0) {
        alert("Adicione pelo menos um requisito obrigatório.");
        return;
      }

      // 1) REQUISITOS (vagaRequisicao)
      await useApi({
        endpoint: `/vagarequisicao/${id}`,
        method: "POST",
        body: {
          atuacao: responsabilidades,
          conhecimentos: requisitos,
          destaque: diferenciais,
        },
      });

      // 2) BENEFÍCIOS (vagaBeneficio)
      await useApi({
        endpoint: `/vagabeneficio/${id}`,
        method: "POST",
        body: {
          salario: salario ? Number(salario) : null,
          beneficios,
        },
      });

      // 3) PROCESSO SELETIVO (vagaProcesso)
      await useApi({
        endpoint: `/vagaprocesso/${id}`,
        method: "POST",
        body: {
          processoSeletivo: processoTexto,
          entrevistador: "",
          time: time,
        },
      });

      navigate(`/criarVaga/acessibilidade/${id}`);
    } catch (error) {
      console.error("Erro ao salvar requisitos:", error);
      alert("Erro ao salvar informações da vaga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-white px-4 py-10">
      <form
        className="w-full max-w-2xl bg-white shadow-lg border border-gray-200 rounded-2xl p-10 space-y-10"
        onSubmit={handleSubmit}
      >
        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Requisitos da vaga
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Essa etapa define quem realmente está preparado para a oportunidade.
          </p>
        </div>

        {/* RESPONSABILIDADES */}
        <div>
          <label className="font-medium text-gray-800">
            Responsabilidades da vaga <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Descreva o que essa pessoa fará no dia a dia. 
Ex: Desenvolver APIs, integrar serviços, participar de code reviews..."
            value={responsabilidades}
            onChange={(e) => setResponsabilidades(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* REQUISITOS OBRIGATÓRIOS */}
        <div>
          <label className="font-medium text-gray-800">
            Requisitos obrigatórios (hard skills) <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-2 mt-2">
            <input
              placeholder="Ex: Node.js, SQL, React..."
              value={requisito}
              onChange={(e) => setRequisito(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 h-[48px]"
            />
            <button
              className="px-4 h-[48px] bg-purple-600 text-white rounded-lg"
              onClick={addRequisito}
            >
              Add
            </button>
          </div>

          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            {requisitos.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* DIFERENCIAIS */}
        <div>
          <label className="font-medium text-gray-800">Diferenciais (opcional)</label>

          <div className="flex gap-2 mt-2">
            <input
              placeholder="Ex: Experiência com IA, cloud AWS..."
              value={diferencial}
              onChange={(e) => setDiferencial(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 h-[48px]"
            />
            <button
              className="px-4 h-[48px] bg-purple-600 text-white rounded-lg"
              onClick={addDiferencial}
            >
              Add
            </button>
          </div>

          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
            {diferenciais.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* BENEFÍCIOS */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-900">Benefícios</h3>
          <p className="text-sm text-gray-600">
            Liste tudo que a empresa oferece para atrair bons candidatos.
          </p>

          <div className="mt-4">
            <label className="font-medium text-gray-800">Faixa salarial (opcional)</label>
            <input
              placeholder="Ex: 3500"
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              className="w-full border mt-2 border-gray-300 rounded-lg px-4 h-[48px]"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium text-gray-800">Outros benefícios</label>
            <div className="flex gap-2 mt-2">
              <input
                placeholder="Ex: VT, VR, plano de saúde..."
                value={beneficio}
                onChange={(e) => setBeneficio(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 h-[48px]"
              />
              <button
                className="px-4 h-[48px] bg-purple-600 text-white rounded-lg"
                onClick={addBeneficio}
              >
                Add
              </button>
            </div>

            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              {beneficios.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* PROCESSO SELETIVO */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-900">Processo seletivo</h3>
          <p className="text-sm text-gray-600">
            Explique rapidamente como será o processo para não gerar ansiedade no candidato.
          </p>

          <textarea
            rows={4}
            placeholder={`Exemplo:
1. Triagem curricular
2. Entrevista com RH
3. Entrevista técnica
4. Retorno final`}
            value={processoTexto}
            onChange={(e) => setProcessoTexto(e.target.value)}
            className="w-full mt-3 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
          />
          <label className="font-medium text-gray-800">Quem será seu time?</label>
          <div className="flex gap-2 mt-2">
            <input
              placeholder="Ex: BI, Excel, RH..."
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 h-[48px]"
            />
          </div>
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={loading}
          className="h-[48px] w-full bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? "Salvando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}
