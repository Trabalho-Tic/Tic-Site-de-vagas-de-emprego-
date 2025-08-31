import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";

export default function Register() {
  const [login, setLogin] = useState("");        // nome
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState(""); // telefone (string)
  const [cpf, setCpf] = useState("");
  const [type, setType] = useState("CANDIDATO");  // typeUser: valor PADRÃO
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    // monta o payload com os NOMES que o backend espera, já com trim()
    const payload = {
      nome: (login || "").trim(),
      email: (email || "").trim(),
      cpf: (cpf || "").trim(),
      telefone: (cellphone || "").trim(),
      typeUser: (type || "").trim(),   // 'CANDIDATO' | 'EMPRESA'
      password: (password || "").trim(),
    };

    try {
      // validação rápida no front (opcional)
      for (const k of ["nome","email","cpf","telefone","typeUser","password"]) {
        if (!payload[k]) throw new Error("Campos obrigatórios: nome, email, cpf, telefone, typeUser, password");
      }

      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        const details = Array.isArray(data?.details)
          ? " " + data.details.map(d => d.message).join(" | ")
          : "";
        throw new Error(data?.error || ("Falha no registro." + details));
      }

      navigate("/");
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <div className="flex flex-col">
            <p className="text-lg pb-2">User name</p>
            <Input
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Enter your user name"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">Password</p>
            <Input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">Cellphone</p>
            <Input
              required
              type="tel"                // melhor que number
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              placeholder="Enter your cellphone"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">Email</p>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">CPF/CNPJ</p>
            <Input
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Enter your CPF"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">Tipo de Usuário</p>
            {/* select nativo com valores EXATOS que o back espera */}
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded h-[42px]"
            >
              <option value="CANDIDATO">Candidato</option>
              <option value="EMPRESA">Empresa</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Register"}
            </button>
          </div>
        </form>

        {msg && <p className="text-red-600 pb-4 text-center">{msg}</p>}

        <p className="flex justify-center gap-2">
          Já possui uma conta?
          <Link className="text-black font-bold" to={"/"}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
