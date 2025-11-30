import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Páginas principais
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Vagas from "./Pages/Vagas";
import Company from "./Pages/Companies";
import Candidaturas from "./Pages/Candidaturas";
import CriarVaga from "./Pages/CriarVaga";
import CriarVagaBeneficio from "./Pages/CriarVagaBeneficio";
import CriarVagaProcesso from "./Pages/CriarVagaProcesso";
import CriarVagaRequisicao from "./Pages/CriarVagaRequisicao";
import CriarVagaDescricao from "./Pages/CriarVagaDescricao";
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
    element: <SelecionarTipo /> 
  },
  { 
    path: "/selecionar-subtipos/:id_user", 
    element: <SelecionarSubtipos /> 
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
    path: "/criarVaga",
    element: <CriarVaga />,
  },
  {
    path: "/criarVaga/beneficio/:id",
    element: <CriarVagaBeneficio />,
  },
  {
    path: "/criarVaga/Processo/:id",
    element: <CriarVagaProcesso />,
  },
  {
    path: "/criarVaga/Requisicao/:id",
    element: <CriarVagaRequisicao />,
  },
  {
    path: "/criarVaga/Descricao/:id",
    element: <CriarVagaDescricao />,
  },
  {
    path: "/empresas",
    element: <Company />,
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



  {
    path: "*",
    element: <PageNotFound />,
  },
  
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
