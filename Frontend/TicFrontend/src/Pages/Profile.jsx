import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ActivityCard from "../components/ActivityCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import useApi from "../api/Api";

export default function Profile() {
  const [user, setUser] = useState()

  const userLogado = JSON.parse(localStorage.getItem("user"))

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await useApi({
          endpoint: `/user/${userLogado.id}`,
        })

        setUser(response)

      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando perfil...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
  
        <main className="flex flex-col lg:flex-row max-w-7xl mx-auto p-6 gap-6">
          <div className="flex-1 bg-white rounded-2xl shadow p-6">
            <div className="flex items-start gap-4">
              <img
                src={user.company?.logo || ""}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user.nome}</h2>
                <p className="text-gray-500">Designer de UI/UX</p>
                <p className="text-gray-400 text-sm">Porto, Portugal</p>
  
                <div className="mt-4 flex items-center gap-2">
                  <button className="border border-gray-300 rounded-full px-3 py-1 text-sm">
                    Visualizar foto
                  </button>
                </div>
              </div>
            </div>
  
            <div className="border-t my-6" />
            <section>
              <h2 className="text-lg font-semibold mb-3">Sobre você</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">
                  Atualizar suas informações oferecerá a você o conteúdo mais
                  relevante.
                </p>
                <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm">
                  <p>
                    <strong>Situação de emprego:</strong> Desempregado
                  </p>
                  <p>
                    <strong>Nome completo:</strong> Philip Maya
                  </p>
                  <p>
                    <strong>Cargo:</strong> Designer de UI/UX
                  </p>
                  <p>
                    <strong>Localização:</strong> Porto, (Portugal)
                  </p>
                </div>
              </div>
  
              <h2 className="text-lg font-semibold mt-6 mb-3">Resumo</h2>
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <p className="text-gray-700">philip Resumo.pdf</p>
                <span className="text-gray-400 text-sm">
                  Nenhuma data adicionada
                </span>
              </div>
  
              <button className="text-green-600 mt-3 text-sm">
                + Adicionar mais
              </button>
            </section>
  
            <div className="border-t my-6" />
            <h2 className="text-lg font-semibold mb-4">Minhas atividades</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ActivityCard
                company="Meta company"
                title="Designer de produto"
                location="Porto, Portugal (presencial)"
                time="Ativo há 5 dias"
              />
              <ActivityCard
                company="Meta company"
                title="Designer de produto"
                location="Porto, Portugal (Presencial)"
                time="Ativo há 5 dias"
              />
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
