import React, { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function CriarVagaAcessibilidade() {
  const { id } = useParams();
  const [acessibilidades, setAcessibilidades] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    useApi({ endpoint: "/Acessibilidade" }).then(setAcessibilidades);
  }, []);

  const handleSubmit = async () => {
    await useApi({
      endpoint: `/vagaAcessibilidade/${id}`,
      method: "POST",
      body: { acessibilidades: selecionadas },
    });

    navigate(`/criarVaga/resumo/${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="w-full max-w-xl bg-white shadow-lg border border-gray-200 rounded-xl p-8 space-y-6">

        <h2 className="text-2xl font-semibold">Acessibilidades</h2>
        <p className="text-gray-600">Selecione as acessibilidades que a vaga oferece.</p>

        <div className="grid grid-cols-2 gap-3">
          {acessibilidades.map((ace) => (
            <Checkbox
              key={ace.id}
              label={ace.descricao}
              checked={selecionadas.includes(ace.id)}
              onChange={() =>
                setSelecionadas((prev) =>
                  prev.includes(ace.id)
                    ? prev.filter((p) => p !== ace.id)
                    : [...prev, ace.id]
                )
              }
            />
          ))}
        </div>

        <button className="h-[48px] w-full bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium"
                onClick={handleSubmit}>
          Continuar
        </button>
      </div>
    </div>
  );
}
