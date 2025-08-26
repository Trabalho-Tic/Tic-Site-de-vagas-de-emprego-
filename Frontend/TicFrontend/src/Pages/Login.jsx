import React, { useState, useEffect } from "react"
import "../Styles/home.css"
import { Link } from "react-router-dom"
import Input from "../components/input";
import photoLogin from "../assets/photologin.png"

function Login() {
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
        <section className="flex justify-center items-center gap-10">
            <div className="flex flex-col w-90 md:w-125 h-150 border-1 rounded-xl justify-center p-5 md:p-10">
                <div>
                    <h1 className="!text-2xl pb-8">Welcome !</h1>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Sign in to</h2>
                    <p className="text-sm pb-12">Lorem ipsum dolor</p>
                </div>
                <div className="pb-12">
                    <div className="pb-10">
                        <p className="text-lg pb-2">User name</p>
                        <Input placeholder="Enter your user name"></Input>
                    </div>
                    <div>
                        <p className="text-lg pb-2">Password</p>
                        <Input placeholder="Enter your password"></Input>
                    </div>
                </div>
                <div className="pb-8">
                    <button className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-80 md:w-100 h-15">Login</button>
                </div>
                <p className="flex justify-center gap-2">Do you have an Account?<Link className="!text-black" to={"/Vagas"}>Register</Link></p>
            </div>
            <img className="hidden md:flex" src={photoLogin} alt="PhotoLogin" />
        </section>
    )
}

export default Login