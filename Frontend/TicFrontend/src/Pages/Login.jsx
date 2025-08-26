import React, { useState, useEffect } from "react"
import "../Styles/home.css"
import { Link } from "react-router-dom"
import Input from "../components/input";
import photoLogin from "../assets/photologin.png"

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")

    return (
        <section className="flex justify-center items-center gap-10">
            <div className="flex flex-col w-auto md:w-auto h-auto border-1 rounded-xl justify-center p-5 md:p-10">
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
                        <Input
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Enter your user name">
                        </Input>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg pb-2">Password</p>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password">
                        </Input>
                        <Link className="flex justify-end transition-all duration-500 !text-black hover:!text-gray-700">Forget password?</Link>
                    </div>
                </div>
                <div className="pb-8">
                    <button className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-80 md:w-100 h-15 transition-all duration-500 hover:!bg-gray-600">Login</button>
                </div>
                <p className="flex justify-center gap-2">Do you have an Account?<Link className="!text-black" to={"/Vagas"}>Register</Link></p>
            </div>
            <img className="hidden md:flex" src={photoLogin} alt="PhotoLogin" />
        </section>
    )
}

export default Login