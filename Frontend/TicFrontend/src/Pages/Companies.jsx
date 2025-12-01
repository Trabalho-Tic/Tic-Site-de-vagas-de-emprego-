import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Globe,
  Users,
  Star,
  Info,
  Briefcase,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import useApi from "../api/Api"
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const sobreRef = useRef(null);
  const vagasRef = useRef(null);

  useEffect(() => {
    async function fetchEmpresa() {
      const response = await useApi({
        endpoint: "/company",
      })

      setCompanies(response)
      console.log(response[0])
      setSelectedCompany(response[0])
    }

    fetchEmpresa()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col text-gray-800">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-8 px-4 pb-16">
          <aside className="md:col-span-1 flex flex-col gap-6">
            {companies.map((empresa) => (
              <div
                key={empresa.id}
                onClick={() => setSelectedCompany(empresa)}
                className={`bg-white rounded-2xl shadow-md p-5 h-[150px] flex flex-col justify-between border cursor-pointer transition-all duration-300 ${
                  selectedCompany?.id === empresa.id
                    ? "border-green-500 shadow-lg"
                    : "border-transparent hover:border-green-400 hover:shadow-lg"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg`}
                    >
                      <img src={empresa.logo} alt="" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {empresa.nome}
                      </h4>
                      <p className="text-xs text-gray-500">{empresa.desc}</p>
                    </div>
                  </div>
                </div>

                <div>
                  
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs py-2 rounded-full font-medium hover:border-green-400 hover:text-green-600 transition-all duration-300"
                    onClick={() => setSelectedCompany(empresa)}
                  >
                    Ver Empresa
                  </button>
                </div>
              </div>
            ))}
          </aside>

          {selectedCompany && (
            <section className="md:col-span-3 bg-white rounded-3xl shadow-md p-4 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b pb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center">
                    <img src={selectedCompany.logo} alt="" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {selectedCompany.nome}
                    </h2>
                    <p className="text-sm text-gray-500">{selectedCompany.desc}</p>
                    <p className="text-xs text-gray-400">{selectedCompany.cidade + ", " + selectedCompany.pais}</p>
                  </div>
                </div>
                <a href={selectedCompany.url_site} className="px-5 py-2 bg-white border border-gray-400 text-gray-800 text-sm rounded-full font-medium hover:border-green-600 hover:text-green-700 transition-all duration-300">
                  Visitar site
                </a>
              </div>

              <div className="flex justify-around mt-3 border-b text-sm font-medium text-gray-500">
                <button
                  type="button"
                  onClick={() => scrollTo(sobreRef)}
                  className="flex items-center gap-1 pb-2 hover:text-green-600 hover:border-b-2 hover:border-green-600 border-b-2 border-transparent transition-colors"
                >
                  <Info size={15} />
                  <span>Sobre</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo(vagasRef)}
                  className="flex items-center gap-1 pb-2 hover:text-green-600 hover:border-b-2 hover:border-green-600 border-b-2 border-transparent transition-colors"
                >
                  <Briefcase size={15} />
                  <span>Vagas</span>
                </button>
              </div>

              <div ref={sobreRef} className="mt-6 scroll-mt-28">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Sobre</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedCompany.sobre}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="border rounded-xl p-4 text-sm text-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Contato</p>
                    {selectedCompany.user.telefone}
                  </div>
                  <div className="border rounded-xl p-4 text-sm text-gray-700">
                    <p className="text-xs text-gray-400 mb-1">E-mail</p>
                    <span>{selectedCompany.user.email}</span>
                  </div>
                </div>
              </div>

              <section ref={vagasRef} className="mt-12 border-t pt-8 scroll-mt-28">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Vagas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCompany.vagas.map((vaga, i) => (
                    <Link to={`/vagas/${vaga.id}`} className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-800">{vaga.nome}</h4>
                          <p className="text-xs text-gray-500">{vaga.cidade + ", " + vaga.pais}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                            Candidatura facil
                          </span>
                          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                            Muitas candidaturas
                          </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
