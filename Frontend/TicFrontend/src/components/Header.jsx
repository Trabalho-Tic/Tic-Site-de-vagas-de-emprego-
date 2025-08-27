import React from "react"
import "../Styles/home.css"
import { Link } from "react-router-dom"
import logo from "../assets/Jobior.png"

function Home() {

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center sm:px-10 lg:px-30 bg-gradient-to-t from-white to-gray-200 h-15">
            <img className="h-5 hidden sm:flex" src={logo} alt="" />
            <nav className="flex py-5 sm:py-0 gap-8 sm:gap-15">
                <Link to={"/"} className="text-lg font-medium transition-all duration-400 hover:text-gray-200">Vagas</Link>
                <Link to={"/"} className="text-lg font-medium transition-all duration-400 hover:text-gray-200">Empresas</Link>
                <Link to={"/"} className="text-lg font-medium transition-all duration-400 hover:text-gray-200">Profile</Link>
                <Link to={"/"} className="text-lg font-medium transition-all duration-400 hover:text-gray-200">About</Link>
            </nav>
            <Link className="hidden sm:flex bg-black text-white px-5 py-1 transition-all duration-500 hover:bg-gray-500 rounded-xl">Profile</Link>
        </header>
    )
}

export default Home