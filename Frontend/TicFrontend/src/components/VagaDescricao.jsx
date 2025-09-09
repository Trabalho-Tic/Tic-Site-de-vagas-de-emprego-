import React from "react";

import { Zap } from "lucide-react";


import logo from "../assets/js moderno.webp"

function VagaDescricao() {
    return (
        <>
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
            <div className="flex flex-col pt-14">
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Where you'll do it:</span> Franca</p>
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">The interview Process:</span> It will have 2 stages that include a 45 min HR chat ➡️ 1h Cultural/Technical chat</p>
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Tools:</span> Figma</p>
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Reporting to:</span> Design Manager, Bruno Mota</p>
                <p className="text-sm font-medium pb-1"><span className="text-lg font-semibold">Your Team:</span> u will mainly be part of a UX Designer’s team, working with cross-functional teams and a wider group of UX department</p>
            </div>
            <nav className="pt-15 pb-8">
                <ul className="flex gap-10 ">
                    <li><a className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500" href="">Job Description</a></li>
                    <li><a className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500" href="">Requirement</a></li>
                    <li><a className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500" href="">Benefit</a></li>
                    <li><a className="text-lg font-semibold pb-1 transition-all duration-300 hover:border-b-2 hover:text-gray-500" href="">Overview</a></li>
                </ul>
            </nav>
            <div>
                <p className="text-xl font-medium text-gray-400 pb-6">Job Description</p>
                <p className="text-lg font-bold pb-3">What will make your journey with us unique?</p>
                <ul className="pl-5">
                    <li className="list-disc text-sm font-medium pb-2">A supportive manager who cares about your well-being and is invested in your professional growth.</li>
                    <li className="list-disc text-sm font-medium pb-2">A culture of continuous learning with clear targets and feedback.</li>
                    <li className="list-disc text-sm font-medium">A global company with over 2600 employees located in more than 26 countries, including offices in 3 countries.</li>
                </ul>
            </div>
        </>
    )
}

export default VagaDescricao