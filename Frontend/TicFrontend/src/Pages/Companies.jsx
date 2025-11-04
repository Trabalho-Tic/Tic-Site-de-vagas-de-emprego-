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
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const sobreRef = useRef(null);
  const vagasRef = useRef(null);
  const pessoasRef = useRef(null);
  const vidaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        nome: "NAVA Company",
        desc: "Tecnologia • São Paulo/SP",
        nota: "4.9",
        cor: "bg-green-100 text-green-600",
        sobre:
          "A NAVA é guiada por quatro princípios: obsessão pelo cliente em vez de foco no concorrente, paixão pela inovação, compromisso com a excelência operacional e visão de longo prazo.",
        contato: "aboutnava.com",
        vagas: [
          {
            title: "UI/UX Designer",
            local: "São Paulo, SP",
            tags: ["Candidatura fácil", "Vários candidatos"],
          },
          { title: "Product Designer", local: "Remoto", tags: ["Candidatura fácil"] },
        ],
        pessoas: [
          {
            descricao: "580 funcionários estudaram design industrial e de produto",
            total: "99+",
            avatares: [1, 2, 3, 4, 5],
          },
          { descricao: "26 funcionários trabalham em Porto", total: "21+", avatares: [6, 7, 8, 9, 10] },
        ],
        vida: [
          "https://source.unsplash.com/300x200/?office",
          "https://source.unsplash.com/301x200/?team",
          "https://source.unsplash.com/302x200/?meeting",
          "https://source.unsplash.com/303x200/?coworking",
        ],
      },
      {
        id: 2,
        nome: "Cielo",
        desc: "Finanças • Barueri/SP",
        nota: "4.7",
        cor: "bg-blue-100 text-blue-600",
        sobre:
          "A Cielo é líder em soluções de pagamento na América Latina, oferecendo serviços que facilitam a vida de milhões de empreendedores.",
        contato: "cielo.com.br",
        vagas: [
          { title: "Analista de Dados", local: "Barueri, SP", tags: ["Candidatura fácil"] },
          { title: "Gestor Comercial", local: "Remoto", tags: ["Vários candidatos"] },
        ],
        pessoas: [
          { descricao: "400 funcionários na área de Finanças", total: "85+", avatares: [11, 12, 13, 14, 15] },
          { descricao: "120 funcionários em São Paulo", total: "30+", avatares: [16, 17, 18, 19, 20] },
        ],
        vida: [
          "https://source.unsplash.com/304x200/?office",
          "https://source.unsplash.com/305x200/?meeting",
          "https://source.unsplash.com/306x200/?team",
          "https://source.unsplash.com/307x200/?coworking",
        ],
      },
      {
        id: 3,
        nome: "Itaú",
        desc: "Banco • São Paulo/SP",
        nota: "4.8",
        cor: "bg-orange-100 text-orange-600",
        sobre: "Banco de grande porte com foco em soluções digitais e inovação contínua.",
        contato: "itau.com.br",
        vagas: [
          { title: "Desenvolvedor Back-end", local: "São Paulo, SP", tags: [] },
          { title: "PO Sênior", local: "Híbrido", tags: ["Vários candidatos"] },
        ],
        pessoas: [
          { descricao: "Time de tecnologia com +2k profissionais", total: "99+", avatares: [21, 22, 23, 24, 25] },
          { descricao: "Equipe de dados em franca expansão", total: "50+", avatares: [26, 27, 28, 29, 30] },
        ],
        vida: [
          "https://source.unsplash.com/308x200/?office",
          "https://source.unsplash.com/309x200/?meeting",
          "https://source.unsplash.com/310x200/?team",
          "https://source.unsplash.com/311x200/?coworking",
        ],
      },
      {
        id: 4,
        nome: "Caravaca",
        desc: "Consultoria • Rio de Janeiro/RJ",
        nota: "4.6",
        cor: "bg-purple-100 text-purple-600",
        sobre: "Consultoria estratégica com foco em operações e crescimento.",
        contato: "caravaca.com",
        vagas: [
          { title: "Consultor Pleno", local: "Rio de Janeiro, RJ", tags: [] },
          { title: "Consultor de Dados", local: "Remoto", tags: [] },
        ],
        pessoas: [
          { descricao: "Time sênior com experiência internacional", total: "15+", avatares: [31, 32, 33, 34, 35] },
          { descricao: "Células ágeis multidisciplinares", total: "8+", avatares: [36, 37, 38, 39, 40] },
        ],
        vida: [
          "https://source.unsplash.com/312x200/?office",
          "https://source.unsplash.com/313x200/?meeting",
          "https://source.unsplash.com/314x200/?team",
          "https://source.unsplash.com/315x200/?coworking",
        ],
      },
      {
        id: 5,
        nome: "Olist",
        desc: "E-commerce • Curitiba/PR",
        nota: "4.5",
        cor: "bg-yellow-100 text-yellow-600",
        sobre: "Plataforma para potencializar vendas de lojistas em marketplaces.",
        contato: "olist.com",
        vagas: [
          { title: "Growth Analyst", local: "Curitiba, PR", tags: [] },
          { title: "UX Researcher", local: "Remoto", tags: ["Candidatura fácil"] },
        ],
        pessoas: [
          { descricao: "Time de produto com forte cultura de experimentos", total: "40+", avatares: [41, 42, 43, 44, 45] },
          { descricao: "Time de vendas distribuído no Brasil", total: "25+", avatares: [46, 47, 48, 49, 50] },
        ],
        vida: [
          "https://source.unsplash.com/316x200/?office",
          "https://source.unsplash.com/317x200/?meeting",
          "https://source.unsplash.com/318x200/?team",
          "https://source.unsplash.com/319x200/?coworking",
        ],
      },
      {
        id: 6,
        nome: "Brightspeed",
        desc: "Telecomunicações • São Paulo/SP",
        nota: "4.8",
        cor: "bg-pink-100 text-pink-600",
        sobre: "Operadora de telecom em expansão, com foco em banda larga e atendimento.",
        contato: "brightspeed.com",
        vagas: [
          { title: "Network Engineer", local: "São Paulo, SP", tags: [] },
          { title: "DevOps", local: "Remoto", tags: [] },
        ],
        pessoas: [
          { descricao: "Especialistas em rede e infraestrutura", total: "12+", avatares: [51, 52, 53, 54, 55] },
          { descricao: "Times de suporte 24/7", total: "30+", avatares: [56, 57, 58, 59, 60] },
        ],
        vida: [
          "https://source.unsplash.com/320x200/?office",
          "https://source.unsplash.com/321x200/?meeting",
          "https://source.unsplash.com/322x200/?team",
          "https://source.unsplash.com/323x200/?coworking",
        ],
      },
    ];

    setCompanies(mockData);
    setSelectedCompany(mockData[0]);
  }, []);

  // useEffect(() => {
  //   async function fetchEmpresa() {
  //     const response = await useApi({
  //       endpoint: "/company",
  //     })

  //     setCompanies(response)
  //   }

  //   fetchEmpresa()
  // }, [])

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col text-gray-800">
      <Header />

      <main className="flex-1">
        <section className="max-w-6xl mx-auto mt-8 px-4 flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
          <div className="flex-1 flex items-center bg-white rounded-full shadow-md px-5 py-3 transition-all duration-300 hover:shadow-lg">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Empresa / Área"
              className="w-full bg-transparent outline-none ml-3 text-sm"
            />
          </div>
          <div className="flex-1 flex items-center bg-white rounded-full shadow-md px-5 py-3 transition-all duration-300 hover:shadow-lg">
            <Globe className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Localização"
              className="w-full bg-transparent outline-none ml-3 text-sm"
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-8 px-4 pb-16">
          <aside className="md:col-span-1 flex flex-col gap-6">
            {companies.map((empresa) => (
              <div
                key={empresa.id}
                onClick={() => setSelectedCompany(empresa)}
                className={`bg-white rounded-2xl shadow-md p-5 h-[200px] flex flex-col justify-between border cursor-pointer transition-all duration-300 ${
                  selectedCompany?.id === empresa.id
                    ? "border-green-500 shadow-lg"
                    : "border-transparent hover:border-green-400 hover:shadow-lg"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${empresa.cor} w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg`}
                    >
                      {empresa.nome[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {empresa.nome}
                      </h4>
                      <p className="text-xs text-gray-500">{empresa.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <p className="text-xs font-semibold text-gray-700">
                      {empresa.nota}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 bg-[#00B562] text-white text-xs py-2 rounded-full font-medium hover:bg-green-700 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/empresa-vagas/${empresa.id}`, { state: { company: empresa } });
                    }}
                  >
                    Ver Vagas
                  </button>
                  <button
                    className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs py-2 rounded-full font-medium hover:border-green-400 hover:text-green-600 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/empresa-sobre/${empresa.id}`, { state: { company: empresa } });
                    }}
                  >
                    Ver Empresa
                  </button>
                </div>
              </div>
            ))}
          </aside>

          {selectedCompany && (
            <section className="md:col-span-3 bg-white rounded-3xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b pb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="text-green-600" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {selectedCompany.nome}
                    </h2>
                    <p className="text-sm text-gray-500">{selectedCompany.desc}</p>
                    <p className="text-xs text-gray-400">+10K funcionários</p>
                  </div>
                </div>
                <button className="px-5 py-2 bg-white border border-gray-400 text-gray-800 text-sm rounded-full font-medium hover:border-green-600 hover:text-green-700 transition-all duration-300">
                  Visitar site
                </button>
              </div>

              <div className="flex space-x-8 mt-6 border-b text-sm font-medium text-gray-500">
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

                <button
                  type="button"
                  onClick={() => scrollTo(pessoasRef)}
                  className="flex items-center gap-1 pb-2 hover:text-green-600 hover:border-b-2 hover:border-green-600 border-b-2 border-transparent transition-colors"
                >
                  <Users size={15} />
                  <span>Pessoas</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo(vidaRef)}
                  className="flex items-center gap-1 pb-2 hover:text-green-600 hover:border-b-2 hover:border-green-600 border-b-2 border-transparent transition-colors"
                >
                  <ImageIcon size={15} />
                  <span>Vida</span>
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
                    {selectedCompany.contato}
                  </div>
                  <div className="border rounded-xl p-4 text-sm text-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Ações</p>
                    <span>-</span>
                  </div>
                </div>
              </div>

              <section ref={vagasRef} className="mt-12 border-t pt-8 scroll-mt-28">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Vagas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCompany.vagas.map((vaga, i) => (
                    <div key={i} className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-800">{vaga.title}</h4>
                          <p className="text-xs text-gray-500">{vaga.local}</p>
                        </div>
                        <p className="text-xs text-gray-400">1d</p>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {vaga.tags.map((tag, j) => (
                          <span key={j} className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-6">
                  <button className="flex items-center justify-end gap-1 text-[#6B4EFF] text-sm font-medium hover:underline ml-auto">
                    Mostrar mais vagas <ArrowRight size={15} />
                  </button>
                </div>
              </section>

              <section ref={pessoasRef} className="mt-12 border-t pt-8 scroll-mt-28">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Pessoas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedCompany.pessoas.map((p, i) => (
                    <div key={i}>
                      <p className="text-sm text-gray-700 mb-3">{p.descricao}</p>
                      <div className="flex items-center -space-x-2">
                        {p.avatares.map((a) => (
                          <img
                            key={a}
                            src={`https://i.pravatar.cc/100?img=${a}`}
                            alt="Pessoa"
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                        ))}
                        <span className="w-10 h-10 flex items-center justify-center text-xs font-semibold text-gray-600 border-2 border-white rounded-full bg-gray-100">
                          {p.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-6">
                  <button className="flex items-center justify-end gap-1 text-[#6B4EFF] text-sm font-medium hover:underline ml-auto">
                    Mostrar mais pessoas <ArrowRight size={15} />
                  </button>
                </div>
              </section>

              <section ref={vidaRef} className="mt-12 border-t pt-8 scroll-mt-28">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Vida na empresa</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedCompany.vida.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Ambiente"
                      className="rounded-xl object-cover w-full aspect-[4/3] transition-all duration-300 hover:scale-105"
                    />
                  ))}
                </div>
                <div className="text-right mt-6">
                  <button className="flex items-center justify-end gap-1 text-[#6B4EFF] text-sm font-medium hover:underline ml-auto">
                    Mostrar mais <ArrowRight size={15} />
                  </button>
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
