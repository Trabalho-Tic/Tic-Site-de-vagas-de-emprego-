import React from "react"
import "../Styles/home.css"
import { NavLink, Link } from "react-router-dom"
import logo from "../assets/Jobior.png"
import profile from "../assets/profile.png"

function Header() {

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center sm:px-10 lg:px-30 bg-gradient-to-t from-white to-gray-200 h-15">
            <img className="h-5 hidden sm:flex" src={logo} alt="" />
            <nav className="flex py-5 sm:py-0 gap-2 sm:gap-15">
                <NavLink to={"/vagas"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Vagas</NavLink>
                <NavLink to={"/empresas"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Empresas</NavLink>
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-lg bg-green-200 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Profile</NavLink>
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>About</NavLink>
            </nav>
            <Link className="hidden sm:flex items-center gap-3 bg-black text-white px-2 lg:px-4 py-2 transition-all duration-500 hover:bg-gray-500 rounded-4xl">
                <img className="w-8 bg-white rounded-4xl p-2" src={profile} alt="" />
                <p className="hidden lg:flex">Account</p>
            </Link>
        </header>
    )
}

export default Header