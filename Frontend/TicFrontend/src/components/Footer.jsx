import React from "react";
import insta from "../assets/instagram.png"

function Footer() {

    return (
        <footer className="flex flex-col lg:flex-row border-t-2 border-gray-300 lg:px-27 items-center py-5">
            <div className="flex gap-5">
                <button className="border-2 rounded-4xl p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-300">
                    <img src={insta} alt="" />
                </button>
                <button className="border-2 rounded-4xl p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-300">
                    <img src={insta} alt="" />
                </button>
                <button className="border-2 rounded-4xl p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-300">
                    <img src={insta} alt="" />
                </button>
                <button className="border-2 rounded-4xl p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-300">
                    <img src={insta} alt="" />
                </button>
            </div>
            <div className="lg:absolute lg:left-1/2 font-semibold text-lg lg:transform lg:-translate-x-1/2 p-4">
                <p>Desenvolvido por alunos da Uni-Facef</p>
            </div>
        </footer>
    )
}

export default Footer