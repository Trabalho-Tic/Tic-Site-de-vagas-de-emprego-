import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home"
import Vagas from "./Pages/Vagas"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
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