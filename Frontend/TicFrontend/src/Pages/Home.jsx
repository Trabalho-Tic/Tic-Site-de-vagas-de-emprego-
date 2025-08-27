import React from "react"
import Header from "../components/Header"
import Input from "../components/input"
import Card from "../components/Card";
import { Search } from "lucide-react";

function Vagas() {
    return (
        <>
            <Header />
            <section className="flex flex-col justify-center items-center gap-10 pt-10">
                <p className="text-4xl text-shadow-lg/10">Procure por um Job</p>
                <div className="flex flex-col items-center lg:flex-row gap-5">
                    <Input placeholder="Procure pela Vaga"></Input>
                    <Input placeholder="Procure pela Localização"></Input>
                    <button className="w-15 items-center bg-gradient-to-t from-gray-50 to-gray-500 p-5 rounded-4xl transition-all duration-400 shadow-xl hover:-translate-y-1"><Search size={20} /></button>
                </div>
            </section>
            <section className="bg-gradient-to-t to-white from-gray-100 sm:px-0 lg:px-25 py-15 flex flex-col items-center">
                <p className="text-3xl text-center font-semibold px-1 pb-6">Vagas abertas recentemente</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <Card  />
                    <Card  />
                    <Card  />
                    <Card  />
                    <Card  />
                    <Card  />
                </div>
            </section>
        </>
    )
}

export default Vagas