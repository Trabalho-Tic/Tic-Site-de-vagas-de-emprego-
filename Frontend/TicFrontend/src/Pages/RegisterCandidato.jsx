import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import useApi from "../api/Api";
import { Undo2 } from 'lucide-react';

// 🧩 Funções de validação (iguais ao estilo do seu Register antigo)
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateCpf = (cpf) => {
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.length === 11;
};
const validatePhone = (phone) => /^[0-9]{10,11}$/.test(phone);
const validatePassword = (password) => password.length >= 6;

function RegisterCandidato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  // Evita cliques duplos
  if (loading) return;

  // 🔒 Limpa erros anteriores
  setErrors({});

  // 🔍 Validações inline (iguais ao seu padrão)
  let formErrors = {};

  if (!validateEmail(email)) formErrors.email = "Email inválido.";
  if (!validateCpf(cpf)) formErrors.cpf = "CPF inválido (11 dígitos).";
  if (!validatePhone(telefone)) formErrors.telefone = "Telefone inválido.";
  if (!validatePassword(password)) formErrors.password = "A senha deve ter no mínimo 6 caracteres.";
  if (!nome.trim()) formErrors.nome = "O nome é obrigatório.";

  // 🚫 Se houver qualquer erro, exibe e interrompe a execução
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    console.warn("🚫 Dados inválidos — requisição não enviada.");
    return; // 🔥 BLOQUEIO: nada é enviado para o backend
  }

  try {
    setLoading(true);

    // ✅ Nenhum erro → agora sim, envia o POST
    const user = await useApi({
      endpoint: "/user/create",
      method: "POST",
      body: {
        nome,
        email,
        password,
        telefone,
        typeUser: "candidato",
      },
    });

    const response = await useApi({
      endpoint: "/candidato/create",
      method: "POST",
      body: {
        id_user: user.id,
        cpf,
      },
    });

    if (response?.id_user) {
    navigate(`/selecionar-tipo/${response.id_user}`);
    }
    else setErrors({ general: "Erro ao registrar candidato. Tente novamente." });
  } catch (err) {
    console.error(err);
    const msg = err?.message?.toLowerCase() || "";
    if (msg.includes("email")) setErrors({ email: "Este e-mail já está em uso." });
    else if (msg.includes("cpf")) setErrors({ cpf: "Este CPF já está em uso." });
    else setErrors({ general: "Erro ao registrar. Verifique os dados e tente novamente." });
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="flex flex-col items-center py-10 justify-center h-full md:h-screen transition-all duration-300">
      <div className="flex flex-col w-auto lg:w-full gap-10 justify-center p-5 lg:p-10">
        <div className="flex flex-col md:flex-row md:px-20 justify-between items-center">
          <h1 className="!text-2xl pb-4 text-center">Cadastro de Candidato</h1>
          <Link to="/register"><Undo2 /></Link>
        </div>

        {/* Formulário com campos acima */}
        <form
          onSubmit={handleRegister}
          className="grid grid-cols-1 md:w-full md:px-20 lg:grid-cols-2 gap-6 pb-6"
        >
          {/* Nome */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">Nome</p>
            <Input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">Email</p>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Telefone */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">Telefone</p>
            <Input
              required
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Ex: 35999999999"
            />
            {errors.telefone && <p className="text-red-500">{errors.telefone}</p>}
          </div>

          {/* CPF */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">CPF</p>
            <Input
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Apenas números"
            />
            {errors.cpf && <p className="text-red-500">{errors.cpf}</p>}
          </div>

          {/* Senha */}
          <div className="flex flex-col lg:col-span-2">
            <p className="text-lg pb-2">Senha</p>
            <Input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* Erro geral */}
          {errors.general && (
            <p className="text-red-500 text-center lg:col-span-2">{errors.general}</p>
          )}

          {/* Botão */}
          <div className="lg:col-span-2 pb-2">
            <button
              type="submit"
              disabled={loading}
              className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>

        <p className="relative justify-center gap-2 text-center">
          Já possui uma conta?
          <Link className="text-black font-bold" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterCandidato;
