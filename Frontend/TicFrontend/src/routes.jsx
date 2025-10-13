import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Vaga from "./Pages/Vaga";
import Company from "./Pages/Companies";
import CriarVaga from "./Pages/CriarVaga";
import CriarVagaCompleta from "./Pages/CriarVagaBeneficio";
import CriarVagaBeneficio from "./Pages/CriarVagaBeneficio";
import CriarVagaProcesso from "./Pages/CriarVagaProcesso";
import Profile from "./Pages/Profile";

const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/vagas/:id',
        element: <Vaga />
    },
    {
        path: '/criarVaga',
        element: <CriarVaga />
    },
    {
        path: '/criarVaga/beneficio/:id',
        element: <CriarVagaBeneficio />
    },
    {
        path: '/criarVaga/Processo/:id',
        element: <CriarVagaProcesso />
    },
    {
        path: '/empresas',
        element: <Company />
    },
    {
        path: '/profile',
        element: <Profile/>
    }
])

function Router() {
    return <RouterProvider router={routes}/>
}

export default Router