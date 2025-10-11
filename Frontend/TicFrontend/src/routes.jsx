import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Vaga from "./Pages/Vaga";
import Company from "./Pages/Companies";
import CriarVaga from "./Pages/CriarVaga";
import CriarVagaCompleta from "./Pages/CriarVagaCompleta";

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
        path: '/criarVaga/:id',
        element: <CriarVagaCompleta />
    },
    {
        path: '/empresas',
        element: <Company />
    }
])

function Router() {
    return <RouterProvider router={routes}/>
}

export default Router