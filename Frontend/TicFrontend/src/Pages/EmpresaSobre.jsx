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
      sobre: "A NAVA é guiada por quatro princípios: obsessão pelo cliente, paixão pela inovação, excelência operacional e visão de longo prazo.",
      contato: "aboutnava.com"
    },
    {
      id: 2,
      nome: "Cielo",
      desc: "Finanças • Barueri/SP",
      sobre: "A Cielo é líder em soluções de pagamento na América Latina.",
      contato: "cielo.com.br"
    }
  ];
}

export default function EmpresaSobre() {
  const { id } = useParams();
  const location = useLocation();
  const companyFromState = location.state?.company;
  const company = companyFromState || getMock().find((c) => String(c.id) === String(id));

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold text-gray-800">{company?.nome}</h1>
        <p className="text-sm text-gray-500 mt-1">{company?.desc}</p>

        <section className="bg-white rounded-2xl shadow-sm border p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Sobre</h2>
          <p className="text-sm text-gray-600">{company?.sobre}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border rounded-xl p-4 text-sm text-gray-700">
              <p className="text-xs text-gray-400 mb-1">Contato</p>
              {company?.contato || "-"}
            </div>
            <div className="border rounded-xl p-4 text-sm text-gray-700">
              <p className="text-xs text-gray-400 mb-1">Ações</p>-
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
