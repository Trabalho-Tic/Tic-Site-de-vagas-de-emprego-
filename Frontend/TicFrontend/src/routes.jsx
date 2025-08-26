import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login"
import Vagas from "./Pages/Vagas"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/vagas',
        element: <Vagas />
    },
])

function Router() {
    return <RouterProvider router={routes}/>
}

export default Router