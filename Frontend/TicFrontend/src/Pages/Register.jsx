import React, { useState, useEffect } from "react"
import "../Styles/login.css"
import { Link } from "react-router-dom"
import Input from "../components/input";
import photoLogin from "../assets/photologin.png"

function Register() {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("")
    const [cellphone, setCellphone] = useState("")
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")

    return (
        <section className="flex justify-center items-center gap-10 py-4 lg:py-0 lg:px-75 sm:h-screen">
            <div className="flex flex-col w-auto lg:w-full h-auto border-1 rounded-xl justify-center p-5 lg:p-10">
                <div>
                    <h1 className="!text-2xl pb-4">Welcome !</h1>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Register now</h2>
                    <p className="text-sm pb-4">Lorem ipsum dolor</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                    <div className="flex flex-col">
                        <p className="text-lg pb-2">User name</p>
                        <Input
                            required
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Enter your user name">
                        </Input>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg pb-2">Password</p>
                        <Input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password">
                        </Input>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg pb-2">Cellphone</p>
                        <Input
                            required
                            type="number"
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                            placeholder="Enter your Cellphone">
                        </Input>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg pb-2">Email</p>
                        <Input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email">
                        </Input>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg pb-2">CPF</p>
                        <Input
                            required
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="Enter your CPF">
                        </Input>
                    </div>
                </div>
                <div className="pb-8">
                    <button className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600">Register</button>
                </div>
                <p className="flex justify-center gap-2">Do you have an Account?<Link className="text-black font-bold" to={"/"}>Login</Link></p>
            </div>
        </section>
    )
}

export default Register