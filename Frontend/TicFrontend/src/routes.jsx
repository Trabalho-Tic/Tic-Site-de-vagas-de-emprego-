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
import Curriculo from "./Pages/Curriculo";

// Registro dividido
import RegisterSelect from "./Pages/RegisterSelect";
import RegisterCandidato from "./Pages/RegisterCandidato";
import RegisterEmpresa from "./Pages/RegisterEmpresa";

// Área administrativa
import AdminLayout from "./admin/Layout";
import UsuariosPage from "./admin/pages/CandidatosPage";
import VagasPage from "./admin/pages/VagasPage";
import CrudEmpresasPage from "./admin/pages/CrudEmpresasPage"; // Importa a página do CRUD de Empresas

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
  path: "/vagas",
  element: <Vaga />,
},
{
  path: "/vagas/:id",
  element: <Vaga />,
},
  {
    path: "/empresas",
    element: <Company />,
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
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <UsuariosPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "vagas", element: <VagasPage /> },
      { path: "empresas", element: <CrudEmpresasPage /> }, // Rota para o CRUD de Empresas
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
