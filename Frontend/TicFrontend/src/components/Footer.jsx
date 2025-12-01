import React from "react";
import insta from "../assets/instagram.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-5 mt-12">

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-600">

        {/* Coluna 1 – Marca */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-gray-900">Jobior</h2>
          <p className="text-sm leading-relaxed">
            Conectando talentos criativos juniores a oportunidades que impulsionam carreiras.
          </p>
        </div>

        {/* Coluna 2 – Links rápidos */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-gray-900">Links rápidos</h3>
          <Link to={`/vagas`} className="text-sm hover:text-green-600 transition">Vagas</Link>
          <Link to={`/empresas`} className="text-sm hover:text-green-600 transition">Empresas</Link>
        </div>

        {/* Coluna 3 – Institucional */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-gray-900">Institucional</h3>
          <Link to={`/about`} className="text-sm hover:text-green-600 transition">Sobre o projeto</Link>
        </div>

        {/* Coluna 4 – Redes sociais */}
        <div className="flex flex-col gap-4 items-center sm:items-start">
          <h3 className="font-semibold text-lg text-gray-900">Redes</h3>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map(i => (
              <button
                key={i}
                className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-full transition hover:-translate-y-1 hover:shadow-md"
                aria-label="Instagram"
              >
                <img src={insta} alt="Instagram" className="w-5 h-5" />
              </button>
            ))}
          </div>

          <p className="text-xs mt-2 opacity-70">
            Apoio: OAB Franca • UNIFACEF
          </p>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-5 border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm gap-3">

        <p className="text-center sm:text-left">
          Desenvolvido por alunos da Uni-Facef
        </p>

        <p className="text-center sm:text-right">
          © 2025 Jobior — Todos os direitos reservados
        </p>

      </div>
    </footer>
  );
}

export default Footer;
