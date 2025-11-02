import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "@fontsource/inter"; // Fonte moderna
import "material-symbols";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#F8F9FA] font-[Inter] text-[#111827]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-sm font-medium">
          {/* Usuários */}
          <NavLink
            to="/admin/usuarios"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive ? "bg-indigo-50 text-indigo-600 font-semibold" : ""
              }`
            }
          >
            <span className="material-symbols-outlined">group</span>
            Candidatos
          </NavLink>

          {/* Vagas */}
          <NavLink
            to="/admin/vagas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive ? "bg-indigo-50 text-indigo-600 font-semibold" : ""
              }`
            }
          >
            <span className="material-symbols-outlined">work</span>
            Vagas
          </NavLink>

          {/* Empresas */}
          <NavLink
            to="/admin/empresas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                isActive ? "bg-indigo-50 text-indigo-600 font-semibold" : ""
              }`
            }
          >
            <span className="material-symbols-outlined">business</span>
            Empresas
          </NavLink>
        </nav>

        {/* Rodapé da sidebar */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              alt="Avatar do admin"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Administrador</p>
              <p className="text-xs text-gray-500">admin@empresa.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
