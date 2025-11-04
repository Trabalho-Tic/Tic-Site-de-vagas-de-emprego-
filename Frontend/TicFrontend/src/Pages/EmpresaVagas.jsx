import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function getMock() {
  return [
    {
      id: 1,
      nome: "NAVA Company",
      desc: "Tecnologia • São Paulo/SP",
      vagas: [
        { title: "UI/UX Designer", local: "São Paulo, SP", tags: ["Candidatura fácil", "Vários candidatos"] },
        { title: "Product Designer", local: "Remoto", tags: ["Candidatura fácil"] }
      ]
    },
    {
      id: 2,
      nome: "Cielo",
      desc: "Finanças • Barueri/SP",
      vagas: [
        { title: "Analista de Dados", local: "Barueri, SP", tags: ["Candidatura fácil"] },
        { title: "Gestor Comercial", local: "Remoto", tags: ["Vários candidatos"] }
      ]
    }
  ];
}

export default function EmpresaVagas() {
  const { id } = useParams();
  const location = useLocation();
  const companyFromState = location.state?.company;
  const company = companyFromState || getMock().find((c) => String(c.id) === String(id));

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold text-gray-800">Vagas — {company?.nome}</h1>
        <p className="text-sm text-gray-500 mt-1">{company?.desc}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {company?.vagas?.map((vaga, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-gray-800 text-sm">{vaga.title}</h3>
              <p className="text-xs text-gray-500">{vaga.local}</p>
              <div className="flex gap-2 mt-3">
                {vaga.tags?.map((t, j) => (
                  <span key={j} className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
