import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Vaga from "./Pages/Vaga";
import Company from "./Pages/Companies";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/vagas',
        element: <Vaga />
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