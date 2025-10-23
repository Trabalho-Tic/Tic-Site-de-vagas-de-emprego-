import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";

function RegisterSelect() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-8">Como você deseja se cadastrar?</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate("/register-candidato")}
          className="bg-black text-white px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:bg-gray-700"
        >
          Sou Candidato
        </button>
        <button
          onClick={() => navigate("/register-empresa")}
          className="bg-white border-2 border-black px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:bg-gray-200"
        >
          Sou Empresa
        </button>
      </div>

      <p className="pt-10">
        Já possui uma conta?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-black font-bold cursor-pointer"
        >
          Login
        </span>
      </p>
    </section>
  );
}

export default RegisterSelect;
