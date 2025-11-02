import React, { useState, useEffect } from "react";
import "../Styles/home.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/Jobior.png";
import profile from "../assets/profile.png";
import { LogOut, User, FileText, Heart } from "lucide-react";

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
    <header className="flex justify-center sm:flex-row sm:justify-between items-center sm:px-10 lg:px-30 bg-gradient-to-t from-white to-gray-200 h-15 relative">
      <img className="h-7 hidden sm:flex" src={logo} alt="Logo Jobior" />

      <nav className="flex py-5 sm:py-0 sm:gap-15">
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive
              ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400"
              : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-600"
          }
        >
          Home
        </NavLink>

        <NavLink
          to={"/vagas"}
          className={({ isActive }) =>
            isActive
              ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400"
              : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-600"
          }
        >
          Vagas
        </NavLink>

        <NavLink
          to={"/empresas"}
          className={({ isActive }) =>
            isActive
              ? "text-lg bg-green-300 rounded-xl py-2 px-3 font-medium transition-all duration-400"
              : "text-lg font-medium py-2 px-3 transition-all duration-400 hover:text-gray-600"
          }
        >
          Empresas
        </NavLink>
      </nav>

      {token ? (
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          onMouseEnter={() => setMenuAberto(true)}
          onMouseLeave={() => setMenuAberto(false)}
        >
          {/* Ícone + nome */}
          <div className="flex items-center gap-2 border border-black rounded-3xl px-3 py-1 bg-white hover:bg-gray-100 transition-all duration-300">
            <img
              src={profile}
              alt="Perfil"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <p className="hidden md:flex text-black font-medium">{user?.nome}</p>
          </div>

          {/* Dropdown */}
          {menuAberto && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-xl p-4 w-56 border border-gray-200 animate-fade-in z-50">
              <p className="font-semibold text-gray-800 mb-2">{user?.nome}</p>
              <p className="text-xs text-gray-500 mb-3 truncate">{user?.email}</p>
              <hr className="mb-3" />

              <ul className="flex flex-col gap-2 text-sm">
                <li
                  onClick={() => navigate("/perfil")}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                >
                  <User size={16} /> Perfil
                </li>

                {/* Somente candidatos */}
                {user?.tipo === "candidato" && (
                  <>
                    <li
                      onClick={() => navigate("/curriculo")}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                    >
                      <FileText size={16} /> Meu Currículo
                    </li>
                    <li
                      onClick={() => navigate("/candidaturas")}
                      className="flex items-center gap-2 text-gray-700 hover:text-green-500 cursor-pointer"
                    >
                      <Heart size={16} /> Minhas Candidaturas
                    </li>
                  </>
                )}

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
