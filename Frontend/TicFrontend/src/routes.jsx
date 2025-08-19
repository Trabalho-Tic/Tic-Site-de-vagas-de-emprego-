import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages"
import Vagas from "./Pages"

const router = createBrowserRouter([
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