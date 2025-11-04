import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Input from "../components/input";
import Card from "../components/Card";
import VagaDescricao from "../components/VagaDescricao";
import Footer from "../components/Footer";
import useApi from "../api/Api";

function UpdateVaga() {

  return (
    <>
      <Header />

      {/* 🔎 Seção de busca */}
      <section className="flex flex-col items-center gap-10 py-10 border-b border-gray-300">
        <p className="text-4xl font-semibold">Edite o seu Job</p>
      </section>

      <div className="w-auto border my-10 mx-20 border-gray-300 p-10 rounded-xl shadow-sm bg-white">
                <VagaDescricao />
            </div>

      <Footer />
    </>
  );
}

export default UpdateVaga;
