import React, { useState, useEffect } from "react"
import "../Styles/home.css"
import { Link } from "react-router-dom"

function Home() {
    const [acessibilidade, setAcessibilidade] = useState([]);

    useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8000/acessibilidade");
      const data = await res.json();
      console.log(data)
      setAcessibilidade(data);
    }
    fetchData();
  }, []);

    return (
        <section className="flex flex-col gap-10">
            <h1 className="border-2 p-4 rounded-4xl animate-pulse shadow-xl shadow-blue-800">Ola home</h1>
            <Link className="border-2 p-2 rounded-4xl shadow-xl text-center hover:bg-blue-950 duration-500" to={"/vagas"}> Vagas </Link>
        </section>
    )
}

export default Home