import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Páginas principais
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Vagas from "./Pages/Vagas";
import Company from "./Pages/Companies";
import Candidaturas from "./Pages/Candidaturas";
import CardCompanies from "./components/CardCompanies";
import Profile from "./Pages/Profile";
import LandingPage from "./Pages/LandingPage";
import Curriculo from "./Pages/Curriculo";
import MeuCurriculo from "./Pages/MeuCurriculo";

// Registro dividido
import RegisterSelect from "./Pages/RegisterSelect";
import RegisterCandidato from "./Pages/RegisterCandidato";
import RegisterEmpresa from "./Pages/RegisterEmpresa";

// Área administrativa
import AdminLayout from "./admin/Layout";
import UsuariosPage from "./admin/pages/CandidatosPage";
import VagasPage from "./admin/pages/VagasPage";
import CrudEmpresasPage from "./admin/pages/CrudEmpresasPage";
import Vinculo from "./admin/pages/VinculoPage";

import Vaga from "./Pages/Vaga";
import UpdateVaga from "./Pages/UpdateVaga";
import CandidaturasVaga from "./Pages/CandidaturaVaga";
import PageNotFound from "./Pages/PageNotFound";

import SelecionarTipo from "./Pages/SelecionarTipo";
import SelecionarSubtipos from "./Pages/SelecionarSubtipos";
import About from "./Pages/About";

// NOVO FLUXO DE CRIAÇÃO DE VAGA
import CriarVagaInformacoes from "./Pages/CriarVagaInformacoes";
import CriarVagaRequisitos from "./Pages/CriarVagaRequisitos";
import CriarVagaAcessibilidade from "./Pages/CriarVagaAcessibilidade";
import CriarVagaResumo from "./Pages/CriarVagaResumo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/curriculo",
    element: <Curriculo />,
  },
  {
    path: "/register",
    element: <RegisterSelect />,
  },
  {
    path: "/register-candidato",
    element: <RegisterCandidato />,
  },
  {
    path: "/selecionar-tipo/:id_user",
    element: <SelecionarTipo />,
  },
  {
    path: "/selecionar-subtipos/:id_user",
    element: <SelecionarSubtipos />,
  },
  {
    path: "/register-empresa",
    element: <RegisterEmpresa />,
  },
  {
    path: "/empresas",
    element: <Company />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/vagas",
    element: <Vagas />,
  },
  {
    path: "/vagas/:id",
    element: <Vaga />,
  },
  {
    path: "/UpdateVaga/:id",
    element: <UpdateVaga />,
  },
  {
    path: "/candidaturas/:id",
    element: <Candidaturas />,
  },
  {
    path: "/candidaturasVaga/:id",
    element: <CandidaturasVaga />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/card-companies",
    element: <CardCompanies />,
  },
  {
    path: "/meu-curriculo",
    element: <MeuCurriculo />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <UsuariosPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "vagas", element: <VagasPage /> },
      { path: "empresas", element: <CrudEmpresasPage /> },
      { path: "vinculo", element: <Vinculo /> },
    ],
  },

  // NOVO FLUXO DE CRIAÇÃO DE VAGA
  {
    path: "/criarVaga",
    children: [
      { index: true, element: <CriarVagaInformacoes /> },
      { path: "requisitos/:id", element: <CriarVagaRequisitos /> },
      { path: "acessibilidade/:id", element: <CriarVagaAcessibilidade /> },
      { path: "resumo/:id", element: <CriarVagaResumo /> },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
