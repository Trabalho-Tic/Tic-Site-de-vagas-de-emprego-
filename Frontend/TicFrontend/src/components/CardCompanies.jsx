import React from "react";
import { Link } from "react-router-dom";

function CardCompanies(props) {

  console.log(props.empresa)

  return (
    <Link to={`/empresa/sobre`} className="flex flex-col h-auto w-70 p-6 border border-gray-300 rounded-2xl items-center shadow-lg transition-all duration-300 hover:shadow-purple-300 hover:-translate-y-1">
      <div className="flex gap-5 items-center">
        <img className="h-15 w-15 rounded-full" src={props.empresa.logo} alt="" />
        <div className="flex justify-between gap-10 py-6">
          <p className="text-lg font-semibold">{props.empresa.nome}</p>
        </div>
      </div>
      <div className="flex w-full gap-4 flex-wrap justify-center">
        <button
          className="bg-purple-100 font-bold text-sm text-purple-400 w-full px-4 py-2 rounded-3xl transition duration-300 hover:bg-purple-500 hover:text-white"
        >
          Ver mais
        </button>
      </div>
    </Link>
  );
}

export default CardCompanies;
