import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Vaga from "./Pages/Vaga";
import Company from "./Pages/Companies";
import CriarVaga from "./Pages/CriarVaga";
import CriarVagaBeneficio from "./Pages/CriarVagaBeneficio";
import CriarVagaProcesso from "./Pages/CriarVagaProcesso";
import Profile from "./Pages/Profile";
import CriarVagaRequisicao from "./Pages/CriarVagaRequisicao";
import CriarVagaDescricao from "./Pages/CriarVagaDescricao";
import CardCompanies from "./components/CardCompanies";
import EmpresaVagas from "./Pages/EmpresaVagas";
import EmpresaSobre from "./Pages/EmpresaSobre";
import AdminLayout from "./admin/Layout";
import UsuariosPage from "./admin/pages/UsuariosPage";
import VagasPage from "./admin/pages/VagasPage";
import LandingPage from "./Pages/LandingPage";

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
    path: "/register",
    element: <Register />,
  },
  {
    path: "/vagas/:id",
    element: <Vaga />,
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
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
