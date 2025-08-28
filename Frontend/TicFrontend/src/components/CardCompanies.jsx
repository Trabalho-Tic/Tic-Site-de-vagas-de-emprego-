import React from "react";
import logo from "../assets/js moderno.webp"
import { Star } from "lucide-react"

function CardCompanies(props) {
    return (
        <div className="flex flex-col h-auto w-70 p-6 border-1 border-gray-300 rounded-sm items-center shadow-lg transition-all duration-300 hover:shadow-purple-300 hover:-translate-y-1">
            <img className="h-26 w-26 rounded-full" src={logo} alt="" />
            <div className="flex justify-between gap-10 py-6">
                <p className="text-lg font-semibold">NAVA Company</p>
                <p className="flex gap-1 font-medium text-sm items-center"><Star className="text-yellow-300" /> 3.4</p>
            </div>
            <div className="flex flex-col">
                <p className="text-sm font-medium pb-3 text-gray-700">10.000 to 100,000 employs</p>
                <p className="text-sm font-medium pb-4 text-gray-700">6.988.877 Followers</p>
                <p className="text-sm font-medium pb-6 text-gray-400">74% Recommendation rate in last 2 years </p>
            </div>
            <div className="flex gap-10">
                <button className="text-sm text-purple-400 px-3 py-1 rounded-3xl border-1 border-urple-400 transition-all duration-400 hover:bg-purple-500 hover:text-black font-medium">About</button>
                <button className="bg-purple-100 text-sm text-purple-400 px-3 py-1 rounded-3xl transition-all duration-400 hover:bg-purple-500 hover:text-black font-medium">View More</button>
            </div>
        </div>
    )
}

export default CardCompanies