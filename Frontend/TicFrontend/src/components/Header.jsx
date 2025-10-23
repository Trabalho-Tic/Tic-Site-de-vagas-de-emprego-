import React, { useState, useEffect } from "react"
import "../Styles/home.css"
import { NavLink, Link, useParams } from "react-router-dom"
import logo from "../assets/Jobior.png"
import profile from "../assets/profile.png"
import { LogOut } from 'lucide-react';

function Header() {
    const { id } = useParams()

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"))
            const updatedUser = localStorage.getItem("user")
            setUser(updatedUser ? JSON.parse(updatedUser) : null)
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }

    return (
        <header className="flex justify-center sm:flex-row sm:justify-between items-center sm:px-10 lg:px-30 bg-gradient-to-t from-white to-gray-200 h-15">
            <img className="h-7 hidden sm:flex" src={logo} alt="" />
            <nav className="flex py-5 sm:py-0 sm:gap-15">
                <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Home</NavLink>
                <NavLink to={`/vagas/${id}`} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Vagas</NavLink>
                <NavLink to={"/empresas"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>Empresas</NavLink>
                <NavLink to={"/login"} className={({ isActive }) => isActive ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400 hover:text-gray-200" : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-200"}>About</NavLink>
            </nav>
            {
                token 
                ?   (   
                <div className="flex gap-2 md:gap-10">
                    <Link to="/login" className="sm:flex items-center gap-3 border-1 border-black text-white px-2 lg:pl-1 lg:pr-3 py-2 md:py-1 transition-all duration-500 hover:bg-gray-300 rounded-4xl">
                        <img className="w-6 md:w-8 rounded-4xl md:p-1 md:border-1 md:border-black" src={profile} alt="" />
                        <p className="hidden md:flex text-black">{user.nome}</p>
                    </Link>
                    <button className="border-1 rounded-4xl p-2 transition-all duration-500 hover:bg-gray-300 hover:text-white" onClick={handleLogout}><LogOut /></button>    
                </div>
                )
                :   (
                <Link to="/login" className="sm:flex items-center gap-3 border-1 border-black text-white px-1 lg:pl-1 lg:pr-3 py-1 transition-all duration-500 hover:bg-gray-300 rounded-4xl">
                    <img className="w-4 md:w-8 rounded-4xl md:p-1 md:border-1 md:border-black" src={profile} alt="" />
                    <p className="hidden lg:flex text-black">Login</p>
                </Link>
                )
            }
        </header>
    )
}

export default Header