import React, { useState, useEffect } from "react";
import "../Styles/home.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { LogOut, User, FileText, Heart, ShieldUser  } from "lucide-react";

function Header() {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  }

  return (
    <header className="flex flex-col md:flex-row pt-10 md:pt-0 justify-center sm:flex-row sm:justify-between items-center sm:px-10 lg:px-30 bg-white border-b-2 border-gray-200 h-15 relative">
      <button onClick={() => navigate("/")}>
        <img className="h-7 hidden sm:flex" src={logo} alt="Logo Jobior" />
      </button>

      <nav className="flex py-5 sm:py-0 sm:gap-15">
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive
              ? "text-lg bg-emerald-500 text-white rounded-4xl py-2 px-5 font-semibold transition-all duration-400 hover:bg-emerald-400"
              : "text-lg font-medium rounded-4xl py-2 px-5 transition-all duration-400 hover:bg-emerald-200 hover:text-white"
          }
        >
          Home
        </NavLink>

        <NavLink
          to={"/vagas"}
          className={({ isActive }) =>
            isActive
              ? "text-lg bg-emerald-500 text-white rounded-4xl py-2 px-5 font-semibold transition-all duration-400 hover:bg-emerald-400"
              : "text-lg font-medium rounded-4xl py-2 px-5 transition-all duration-400 hover:bg-emerald-200 hover:text-white"
          }
        >
          Vagas
        </NavLink>

        <NavLink
          to={"/empresas"}
          className={({ isActive }) =>
            isActive
              ? "text-lg bg-emerald-500 text-white rounded-4xl py-2 px-5 font-semibold transition-all duration-400 hover:bg-emerald-400"
              : "text-lg font-medium rounded-4xl py-2 px-5 transition-all duration-400 hover:bg-emerald-200 hover:text-white"
          }
        >
          Empresas
        </NavLink>
        
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            isActive
              ? "text-lg bg-emerald-500 text-white rounded-4xl py-2 px-5 font-semibold transition-all duration-400 hover:bg-emerald-400"
              : "text-lg font-medium rounded-4xl py-2 px-5 transition-all duration-400 hover:bg-emerald-200 hover:text-white"
          }
        >
          Sobre nós
        </NavLink>
      </nav>

      {token ? (
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          onMouseEnter={() => setMenuAberto(true)}
          onMouseLeave={() => setMenuAberto(false)}
        >
          {/* Ícone + nome */}
          <div className="flex items-center gap-2 border border-gray-200 shadow-sm rounded-3xl px-3 py-1 bg-white hover:bg-gray-100 transition-all duration-300">
            <img
              src={profile}
              alt="Perfil"
              className="w-6 h-6 rounded-full"
            />
            <p className="hidden md:flex text-black font-medium">{user?.nome}</p>
          </div>

          {/* Dropdown */}
          {menuAberto && (
            <div className="absolute right-0 top-9 bg-white shadow-lg rounded-xl p-4 w-56 border border-gray-200 animate-fade-in z-50">
              <p className="font-semibold text-gray-800 mb-2">{user?.nome}</p>
              <p className="text-xs text-gray-500 mb-3 truncate">{user?.email}</p>
              <hr className="mb-3" />

              <ul className="flex flex-col gap-2 text-sm">
                <li
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                >
                  <User size={16} /> Perfil
                </li>

                {
                  user?.tipo == "empresa" ? (
                    <li
                      onClick={() => navigate(`/vagas`)}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                    >
                      <Heart size={16} />Candidaturas para Vagas
                    </li>
                  ) : (
                    <></>
                  )
                }

                {/* Somente candidatos */}
                {(user?.tipo === "candidato" || user?.tipo === "admin") && (
                  <>
                    <li
                      onClick={() => navigate("/meu-curriculo")}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                    >
                      <FileText size={16} /> Meu Currículo
                    </li>
                    <li
                      onClick={() => navigate(`/candidaturas/${user.id}`)}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                    >
                      <Heart size={16} /> Minhas Candidaturas
                    </li>
                  </>
                )}

                {
                  user?.tipo === "admin" ? (
                    <li
                      onClick={() => navigate("/admin")}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                    >
                      <ShieldUser  size={16} /> Area Admin
                    </li>
                  ) : (
                    <></>
                  )
                }

                <hr className="my-2" />

                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-400 cursor-pointer"
                >
                  <LogOut size={16} /> Sair
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-3 border border-black rounded-4xl px-3 py-1 bg-white hover:bg-gray-100 transition-all duration-300"
        >
          <img
            className="w-8 h-8 rounded-full border border-gray-300"
            src={profile}
            alt="Login"
          />
          <p className="text-black font-medium hidden md:flex">Login</p>
        </Link>
      )}
    </header>
  );
}

export default Header;
