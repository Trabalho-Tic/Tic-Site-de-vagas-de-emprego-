import React from "react";
import { Search, Zap } from "lucide-react";

import Header from "../components/Header"
import Input from "../components/input"
import Card from "../components/Card";
import VagaDescricao from "../components/VagaDescricao";
import Footer from "../components/Footer"

function Vaga() {
    return (
        <>
        <Header />
        <section className="flex flex-col items-center gap-10 py-10 border-b-1 border-gray-300">
            <p className="text-4xl">Procure por um Job</p>
            <div className="flex flex-col items-center md:flex-row gap-5 lg:w-200">
                <Input placeholder="Procure pela Vaga"></Input>
                <Input placeholder="Procure pela Localização"></Input>
                <button className="w-15 items-center bg-gradient-to-t from-gray-50 to-gray-500 p-5 rounded-4xl transition-all duration-400 shadow-xl hover:-translate-y-1"><Search size={20} /></button>
            </div>
        </section>
        <section className="flex w-full md:px-27 md:py-5 gap-6">
            <div className="hidden lg:flex flex-col gap-2">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className="w-full border-1 border-gray-300 p-10">
                <VagaDescricao />
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Vaga