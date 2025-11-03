import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Input from "../components/input";
import Card from "../components/Card";
import VagaDescricao from "../components/VagaDescricao";
import Footer from "../components/Footer";
import useApi from "../api/Api";

function Vaga() {
  const [vagas, setVagas] = useState([]);
  const [user, setUser] = useState(null);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  // 🔍 Busca usuário logado
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // 🔄 Carrega vagas (todas ou filtradas por empresa)
  useEffect(() => {
    async function fetchVagas() {
      try {
        if (!user) return;

        if (user.tipo === "empresa") {
          // Buscar empresa vinculada ao usuário
          const empresas = await useApi({ endpoint: "/company" });
          const minhaEmpresa = empresas.find((c) => c.id_user === user.id);

          if (minhaEmpresa) {
            // Buscar vagas só da empresa logada
            const vagasEmpresa = await useApi({
              endpoint: `/vaga/empresa/${minhaEmpresa.id}`,
            });
            setVagas(vagasEmpresa);
          }
        } else {
          // Se for candidato → todas as vagas
          const todas = await useApi({ endpoint: "/vaga" });
          setVagas(todas);
        }
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    }

    fetchVagas();
  }, [user]);

  // 🔍 Filtro simples de busca por nome ou cidade
  const vagasFiltradas = vagas.filter(
    (v) =>
      v.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      v.cidade?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Header />

      {/* 🔎 Seção de busca */}
      <section className="flex flex-col items-center gap-10 py-10 border-b border-gray-300">
        <p className="text-4xl font-semibold">Procure por um Job</p>

        <div className="flex flex-col md:flex-row items-center gap-5 lg:w-[50rem]">
          <Input
            placeholder="Procure pela Vaga"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="flex items-center justify-center w-15 bg-gradient-to-t from-gray-50 to-gray-500 p-5 rounded-4xl transition-all duration-300 shadow-xl hover:-translate-y-1">
            <Search size={20} />
          </button>
        </div>
      </section>

      {/* 🧾 Seção de listagem de vagas */}
      <section className="flex flex-col w-full p-10 md:py-10 gap-6">
        {/* Botão de adicionar vaga - só para empresa */}
        {user?.tipo === "empresa" && (
          <button
            onClick={() => navigate("/criarVaga")}
            className="w-full md:w-100 self-start text-lg font-semibold text-white bg-gradient-to-tr from-green-400 to-green-100 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Adicionar vaga
          </button>
        )}

        <div className="flex w-full gap-6">
          <div className="hidden lg:flex flex-col pt-1 gap-2 w-160 overflow-auto scrollbar-hide max-h-450">
            {vagasFiltradas.length > 0 ? (
              vagasFiltradas.map((vaga) => <Card key={vaga.id} vaga={vaga} />)
            ) : (
              <p className="text-gray-500 text-sm italic mt-5">
                Nenhuma vaga encontrada.
              </p>
            )}
          </div>

          <div className="w-full border border-gray-300 p-10 rounded-xl shadow-sm bg-white">
            <VagaDescricao />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Vaga;
