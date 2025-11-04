import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Páginas principais
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Vagas from "./Pages/Vagas";
import Company from "./Pages/Companies";
import CriarVaga from "./Pages/CriarVaga";
import CriarVagaBeneficio from "./Pages/CriarVagaBeneficio";
import CriarVagaProcesso from "./Pages/CriarVagaProcesso";
import CriarVagaRequisicao from "./Pages/CriarVagaRequisicao";
import CriarVagaDescricao from "./Pages/CriarVagaDescricao";
import CardCompanies from "./components/CardCompanies";
import EmpresaVagas from "./Pages/EmpresaVagas";
import EmpresaSobre from "./Pages/EmpresaSobre";
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
import CrudEmpresasPage from "./admin/pages/CrudEmpresasPage"; // Importa a página do CRUD de Empresas
import Vaga from "./Pages/Vaga";
import UpdateVaga from "./Pages/UpdateVaga";

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
    path: "/register-empresa",
    element: <RegisterEmpresa />,
  },
  {
    path: "/empresas",
    element: <Company />,
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
    path: "/empresa-sobre/:id",
    element: <EmpresaSobre />,
  },
  {
    path: "/empresa-vagas/:id",
    element: <EmpresaVagas />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <UsuariosPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "vagas", element: <VagasPage /> },
      {path: "empresas", element: <CrudEmpresasPage />},
    ],
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

  }
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
