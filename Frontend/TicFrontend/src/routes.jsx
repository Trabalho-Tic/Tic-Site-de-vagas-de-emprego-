import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login"
import Vagas from "./Pages/Vagas"
import Register from "./Pages/Register"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/vagas',
        element: <Vagas />
    },
    {
        path: '/register',
        element: <Register />
    }
])

function Router() {
    return <RouterProvider router={routes}/>
}

export default Router