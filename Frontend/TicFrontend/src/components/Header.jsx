import React from "react"
import "../Styles/home.css"
import { NavLink, Link } from "react-router-dom"
import logo from "../assets/Jobior.png"

function Home() {

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center sm:px-10 lg:px-30 bg-gradient-to-t from-white to-gray-200 h-15">
            <img className="h-5 hidden sm:flex" src={logo} alt="" />
            <nav className="flex py-5 sm:py-0 gap-8 sm:gap-15">
                <NavLink to={"/vagas"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-2xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Vagas</NavLink>
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-4xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Empresas</NavLink>
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-4xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Profile</NavLink>
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-4xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>About</NavLink>
            </nav>
            <Link className="hidden sm:flex bg-black text-white px-5 py-1 transition-all duration-500 hover:bg-gray-500 rounded-xl">Profile</Link>
        </header>
    )
}

export default Home