import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import photoLogin from "../assets/photologin.png";

function Login() {
  const [email, setEmail] = useState("");   // renomeei "login" -> "email"
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");       // feedback de erro/sucesso
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // body enviado pro backend
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha no login");

      // guarda no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redireciona para a home
      navigate("/Home");
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <section className="flex justify-center items-center gap-10 h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-auto shadow-xl lg:w-auto h-auto border-1 rounded-xl justify-center p-5 lg:p-10"
      >
        <div>
          <h1 className="!text-2xl pb-8">Welcome !</h1>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Sign in to</h2>
          <p className="text-sm pb-12">Lorem ipsum dolor</p>
        </div>
        <div className="pb-12">
          <div className="pb-10">
            <p className="text-lg pb-2">Email</p>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg pb-2">Password</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <Link className="flex justify-end transition-all duration-500 text-black hover:text-gray-700 font-bold">
              Forget password?
            </Link>
          </div>
        </div>
        <div className="pb-8">
          <button
            type="submit"
            className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600"
          >
            Login
          </button>
        </div>
        {msg && <p className="text-red-500 text-center">{msg}</p>}
        <p className="flex justify-center gap-2">
          Do you have an Account?
          <Link className="text-black font-bold" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
      <img className="hidden lg:flex" src={photoLogin} alt="PhotoLogin" />
    </section>
  );
}

export default Login;
