import React, { useState } from "react"; 
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Select from "../components/select";
import useApi from "../api/Api";

// Funções de validação
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateCpf = (cpf) => {
  const cleanedCpf = cpf.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
  return cleanedCpf.length === 11;  // Verifica se o CPF tem 11 dígitos
};
const validatePhone = (phone) => /^[0-9]{10,11}$/.test(phone); // Aceita telefone com ou sem DDD
const validatePassword = (password) => password.length >= 6;

function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cpf, setCpf] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validações inline
    let formErrors = {};

    if (!validateEmail(email)) formErrors.email = "Email inválido.";
    if (!validateCpf(cpf)) formErrors.cpf = "CPF inválido.";
    if (!validatePhone(cellphone)) formErrors.cellphone = "Telefone inválido.";
    if (!validatePassword(password)) formErrors.password = "A senha deve ter pelo menos 6 caracteres.";

    // Se existirem erros, não continuar
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
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

      // Redireciona após sucesso
      navigate("/");
    } catch (err) {
      console.error(err);

      // Verifica se o erro é devido ao email ou CPF já existentes
      if (err.message.includes("email")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Este e-mail já está em uso.",
        }));
      } else if (err.message.includes("CPF")) {  // Verifica a mensagem de erro para CPF
        setErrors((prevErrors) => ({
          ...prevErrors,
          cpf: "Este CPF já está em uso.",  // Mensagem de erro para CPF já existente
        }));
      } else {
        alert(err?.message || "Erro no cadastro. Verifique os dados e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            {errors.password && <p className="text-red-500">{errors.password}</p>}
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
            {errors.cellphone && <p className="text-red-500">{errors.cellphone}</p>}
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
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">CPF</p>
            <Input
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Escreva seu CPF"
            />
            {errors.cpf && <p className="text-red-500">{errors.cpf}</p>}  
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">Tipo de Usuário</p>
            <Select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
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
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>

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

export default Register;
