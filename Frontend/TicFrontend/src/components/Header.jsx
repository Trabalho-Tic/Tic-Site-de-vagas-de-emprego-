import React from "react"
import "../Styles/home.css"
import { NavLink, Link, useParams } from "react-router-dom"
import logo from "../assets/Jobior.png"
import profile from "../assets/profile.png"

function Header() {
    const { id } = useParams()

    return (
        <header className="flex justify-center sm:flex-row sm:justify-between items-center sm:px-10 lg:px-30 bg-gradient-to-t from-white to-gray-200 h-15">
            <img className="h-7 hidden sm:flex" src={logo} alt="" />
            <nav className="flex py-5 sm:py-0 sm:gap-15">
                <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Home</NavLink>
                <NavLink to={`/vagas/${id}`} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Vagas</NavLink>
                <NavLink to={"/empresas"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Empresas</NavLink>
                <NavLink to={"/login"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>About</NavLink>
            </nav>
            <Link to="/login" className="sm:flex items-center gap-3 border-1 border-black text-white px-1 lg:pl-1 lg:pr-3 py-1 transition-all duration-500 hover:bg-gray-500 rounded-4xl">
                <img className="w-4 md:w-8 rounded-4xl md:p-1 md:border-1 md:border-black" src={profile} alt="" />
                <p className="hidden lg:flex text-black">Login</p>
            </Link>
        </header>
    )
}

export default Header