import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Input from "../components/input";
import Card from "../components/Card";
import Footer from "../components/Footer";
import useApi from "../api/Api";

function Vaga() {
  const [vagas, setVagas] = useState([]);
  const [user, setUser] = useState(null);
  const [busca, setBusca] = useState("");
  const [usarCompatibilidade, setUsarCompatibilidade] = useState(true);
  const [carregando, setCarregando] = useState(true);

  const navigate = useNavigate();

  // 🔍 Busca usuário logado
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    } catch (e) {
      console.error("Erro ao interpretar user do localStorage:", e);
      navigate("/login");
    }
  }, [navigate]);

  // 🔄 Carrega vagas (empresa -> só dela / candidato -> compatíveis ou todas)
  useEffect(() => {
    async function fetchVagas() {
      try {
        if (!user) return;
        setCarregando(true);

        // EMPRESA → mantém exatamente o comportamento antigo
        if (user.tipo === "empresa") {
          const empresas = await useApi({ endpoint: "/company" });
          const minhaEmpresa = empresas.find((c) => c.id_user === user.id);

          if (minhaEmpresa) {
            const vagasEmpresa = await useApi({
              endpoint: `/vaga/empresa/${minhaEmpresa.id}`,
            });
            setVagas(vagasEmpresa || []);
          } else {
            setVagas([]);
          }
          return;
        }

        // CANDIDATO → agora usa match por padrão, com opção de ver todas
        if (user.tipo === "candidato") {
          if (usarCompatibilidade) {
            // 🔁 Vagas compatíveis (todas as vagas, mas ordenadas por compatibilidade e com porcentagem)
            const recomendadas = await useApi({
              endpoint: `/vagas/recomendadas/${user.id}`,
            });

            console.log("AQUI: " + recomendadas)
            setVagas(recomendadas || []);
          } else {
            // 🔁 Todas as vagas, sem ordenação de match
            const todas = await useApi({ endpoint: "/vaga" });
            setVagas(todas || []);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
        setVagas([]);
      } finally {
        setCarregando(false);
      }
    }

    fetchVagas();
  }, [user, usarCompatibilidade]);

  // 🔁 Normaliza estrutura (matchService retorna { vaga, porcentagem... }, /vaga retorna vaga direto)
  const vagasNormalizadas = vagas.map((item) => {
    if (item && item.vaga) {
      return { vaga: item.vaga, match: item }; // com compatibilidade
    }
    return { vaga: item, match: null }; // sem compatibilidade
  });

  // 🔍 Filtro simples de busca por nome ou cidade
  const vagasFiltradas = vagasNormalizadas.filter(({ vaga }) => {
    if (!busca) return true;
    const termo = busca.toLowerCase();
    return (
      vaga.nome?.toLowerCase().includes(termo) ||
      vaga.cidade?.toLowerCase().includes(termo)
    );
  });

  return (
    <>
      <Header />

      {/* 🔎 Seção de busca */}
      <section className="flex flex-col items-center gap-10 py-10 border-b border-gray-300">
        <p className="text-4xl font-semibold">Procure por uma vaga</p>

        <div className="flex flex-col md:flex-row items-center gap-5 lg:w-[50rem]">
          <div className="relative w-full">
            <Input
              placeholder="Procure pela vaga ou cidade"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* barra de seleção: Todas / Compatíveis – só para candidato */}
        {user?.tipo === "candidato" && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">
              Como você quer ver as vagas?
            </span>
            <div className="flex items-center gap-2 text-sm bg-gray-100 rounded-full px-2 py-1">
              <button
                type="button"
                onClick={() => setUsarCompatibilidade(true)}
                className={`px-4 py-1 rounded-full transition-all ${
                  usarCompatibilidade
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Vagas compatíveis
              </button>
              <button
                type="button"
                onClick={() => setUsarCompatibilidade(false)}
                className={`px-4 py-1 rounded-full transition-all ${
                  !usarCompatibilidade
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todas as vagas
              </button>
            </div>
            <p className="text-xs text-gray-500 max-w-md text-center">
              <strong>Vagas compatíveis</strong> são aquelas ordenadas de acordo
              com o seu perfil de acessibilidade
            </p>
          </div>
        )}
      </section>

      {/* 🧾 Seção de listagem de vagas */}
      <section className="flex flex-col items-center w-full p-10 md:py-10 gap-6">
        {/* Botão de adicionar vaga - só para empresa */}
        {user?.tipo === "empresa" && (
          <button
            onClick={() => navigate("/criarVaga")}
            className="w-full md:w-100 text-lg font-semibold text-white bg-gradient-to-tr from-green-400 to-green-100 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Adicionar vaga
          </button>
        )}

        <div className="flex justify-center">
          {carregando ? (
            <p className="text-gray-500 text-lg">Carregando vagas...</p>
          ) : (
            <div className="grid grid-cols-3 pt-1 gap-5 overflow-auto scrollbar-hide max-h-450 w-full">
              {vagasFiltradas.length > 0 ? (
                vagasFiltradas.map(({ vaga, match }) => (
                  <div
                    key={vaga.id}
                    className="relative flex flex-col gap-2 bg-white rounded-xl"
                  >
                    {/* badge de compatibilidade no topo direito, se existir */}
                    {match && (
                      <div className="absolute top-4 right-15">
                        <span className="bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {match.porcentagem ?? 0}% compatível
                        </span>
                      </div>
                    )}

                    <Card vaga={vaga} />

                    {/* chips de acessibilidade (simples) */}
                    {vaga.acessibilidades?.length > 0 && (
                      <div className="flex flex-wrap gap-1 pb-2">
                        {vaga.acessibilidades.slice(0, 3).map((acc) => (
                          <span
                            key={acc.id}
                            className="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                          >
                            {acc.descricao}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-3xl italic mt-5">
                  Nenhuma vaga encontrada.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Vaga;
