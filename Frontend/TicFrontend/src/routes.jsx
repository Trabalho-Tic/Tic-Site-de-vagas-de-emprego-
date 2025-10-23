import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Páginas principais
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Vaga from "./Pages/Vaga";
import Company from "./Pages/Companies";
import CriarVaga from "./Pages/CriarVaga";
import CriarVagaBeneficio from "./Pages/CriarVagaBeneficio";
import CriarVagaProcesso from "./Pages/CriarVagaProcesso";
import CriarVagaRequisicao from "./Pages/CriarVagaRequisicao";
import CriarVagaDescricao from "./Pages/CriarVagaDescricao";
import Profile from "./Pages/Profile";
import LandingPage from "./Pages/LandingPage";

// Registro dividido
import RegisterSelect from "./Pages/RegisterSelect";
import RegisterCandidato from "./Pages/RegisterCandidato";
import RegisterEmpresa from "./Pages/RegisterEmpresa";

// Área administrativa
import AdminLayout from "./admin/Layout";
import UsuariosPage from "./admin/pages/UsuariosPage";
import VagasPage from "./admin/pages/VagasPage";

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

  // 🔹 Novo fluxo de registro
  {
    path: "/register",
    element: <RegisterSelect />, // tela de escolha do tipo de usuário
  },
  {
    path: "/register-candidato",
    element: <RegisterCandidato />,
  },
  {
    path: "/register-empresa",
    element: <RegisterEmpresa />,
  },

  // 🔹 Vagas e empresas
  {
    path: "/vagas/:id",
    element: <Vaga />,
  },
  {
    path: "/empresas",
    element: <Company />,
  },

  // 🔹 Criação de vagas
  {
    path: "/criarVaga",
    element: <CriarVaga />,
  },
  {
    path: "/criarVaga/beneficio/:id",
    element: <CriarVagaBeneficio />,
  },
  {
    path: "/criarVaga/processo/:id",
    element: <CriarVagaProcesso />,
  },
  {
    path: "/criarVaga/requisicao/:id",
    element: <CriarVagaRequisicao />,
  },
  {
    path: "/criarVaga/descricao/:id",
    element: <CriarVagaDescricao />,
  },

  // 🔹 Perfil do usuário
  {
    path: "/profile",
    element: <Profile />,
  },

  // 🔹 Admin
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <UsuariosPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "vagas", element: <VagasPage /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
