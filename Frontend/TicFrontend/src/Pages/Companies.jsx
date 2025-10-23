import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/input";
import CardCompanies from "../components/CardCompanies";
import CompanyDescricao from "../components/CompanyDescricao";
import { Search } from "lucide-react";

function Company() {
    return (
        <>
            <Header />

            <section className="flex flex-col items-center gap-10 py-10 border-b-1 border-gray-300">
                <p className="text-4xl text-center px-3 md:px-0">Procure por uma empresa de job</p>
                <div className="flex flex-col items-center lg:flex-row gap-5 lg:w-200">
                    <Input placeholder="Procure pelo nome da empresa"></Input>
                    <Input placeholder="Procure pela Localização"></Input>
                    <button className="w-15 items-center bg-gradient-to-t from-gray-50 to-gray-500 p-5 rounded-4xl transition-all duration-400 shadow-xl hover:-translate-y-1"><Search size={20} /></button>
                </div>
            </section>

            <section className="flex w-full md:px-27 md:py-5 gap-6">
                <div className="hidden md:flex flex-col gap-2">
                    <CardCompanies />
                    <CardCompanies />
                    <CardCompanies />
                    <CardCompanies />
                    <CardCompanies />
                    <CardCompanies />
                    <CardCompanies />
                </div>
                <div className="w-full border-1 border-gray-300 p-10">
                    <CompanyDescricao />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Company;