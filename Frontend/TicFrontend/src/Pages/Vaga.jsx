import React from "react";
import { Search, Zap } from "lucide-react";

import logo from "../assets/js moderno.webp"

import Header from "../components/Header"
import Input from "../components/input"
import Card from "../components/Card";

function Vaga() {
    return (
        <>
        <Header />
        <section className="flex flex-col items-center gap-10 py-10 border-b-1 border-gray-300">
            <p className="text-4xl">Procure por um Job</p>
            <div className="flex flex-col items-center lg:flex-row gap-5">
                <Input placeholder="Procure pela Vaga"></Input>
                <Input placeholder="Procure pela Localização"></Input>
                <button className="w-15 items-center bg-gradient-to-t from-gray-50 to-gray-500 p-5 rounded-4xl transition-all duration-400 shadow-xl hover:-translate-y-1"><Search size={20} /></button>
            </div>
        </section>
        <section className="flex w-full px-27 pt-5 gap-6">
            <div className="flex flex-col gap-2">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className="w-full border-1 border-gray-300 p-10">
                <div className="flex items-center gap-2">
                    <img className="h-8 w-8 rounded-4xl" src={logo} alt="" />
                    <p>Meta Company</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <div className="flex flex-col">
                        <p className="text-2xl pb-3 font-bold">Product Owner</p>
                        <p className="text-sm font-medium text-gray-600">Porto, Portugal (On site)</p>
                    </div>
                    <button className="flex text-lg rounded-4xl items-center px-6 h-12 gap-2 font-semibold bg-green-400 transition-all duration-500 hover:-translate-y-1 hover:bg-green-300"><Zap size={20} />Easy Apply</button>
                </div>
            </div>
        </section>
        </>
    )
}

export default Vaga