import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Select from "../components/select";
import useApi from "../api/Api";

function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cpf, setCpf] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      // mapeia os nomes do formulário para o que o backend espera
      const payload = {
        nome: login,
        email,
        cpf,
        password,
        telefone: cellphone,
        typeUser: type,
      };

      const response = await useApi({
        endpoint: "/user/create",
        method: "POST",
        body: payload,
      });
      
      // opção 1: redireciona para login
      navigate("/");
      // opção 2 (se quiser auto-login aqui, depois implementamos)
    } catch (err) {
      console.error(err);
      alert(err?.message || "Erro no cadastro. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex justify-center items-center gap-10 py-4 lg:py-0 lg:px-75 sm:h-screen">
      <div className="flex flex-col w-auto lg:w-full h-auto border-1 rounded-xl justify-center p-5 lg:p-10">
        <div>
          <h1 className="!text-2xl pb-4">Bem vindo !</h1>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Registre-se agora</h2>
          <p className="text-sm pb-4"></p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <div className="flex flex-col">
            <p className="text-lg pb-2">Nome</p>
            <Input
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Escreva seu nome"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg pb-2">Senha</p>
            <Input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escreva sua senha"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg pb-2">Telefone</p>
            <Input
              required
              type="tel"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              placeholder="Escreva seu telefone"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg pb-2">Email</p>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escreva seu Email"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg pb-2">CPF</p>
            <Input
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Escreva seu CPF"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg pb-2">Tipo de Usuário</p>
            <Select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {/* Ajuste as opções conforme seu Select; se ele não renderiza children,
                  troque para a API correta do seu componente */}
              <option value="">Selecione</option>
              <option value="candidato">Candidato</option>
              <option value="empresa">Empresa</option>
            </Select>
          </div>

          <div className="lg:col-span-2 pb-2">
            <button
              type="submit"
              disabled={loading}
              className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Register"}
            </button>
          </div>
        </form>

        <p className="flex justify-center gap-2">
          Ja possui uma conta?
          <Link className="text-black font-bold" to={"/"}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
