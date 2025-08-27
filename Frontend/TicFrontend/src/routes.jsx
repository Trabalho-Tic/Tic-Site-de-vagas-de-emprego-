import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"

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
    }
])

function Router() {
    return <RouterProvider router={routes}/>
}

export default Router