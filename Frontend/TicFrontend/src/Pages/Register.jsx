import React, { useState } from "react"; 
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Select from "../components/select";
import useApi from "../api/Api";
import { motion, AnimatePresence } from "framer-motion"

// Funções de validação
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateCpf = (cpf) => {
  const cleanedCpf = cpf.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
  return cleanedCpf.length === 11;  // Verifica se o CPF tem 11 dígitos
};
const validatePhone = (phone) => /^[0-9]{10,11}$/.test(phone); // Aceita telefone com ou sem DDD
const validatePassword = (password) => password.length >= 6;

function Register() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [categoria, setCategoria] = useState("")
  const [cellphone, setCellphone] = useState("");
  const [cpf, setCpf] = useState("");
  const [type, setType] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setType(type ? false : true);
  };

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
        nome: name,
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

  const formVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  return (
    <section className="flex justify-center items-center gap-10 py-4 transition-all duration-300 lg:py-0 lg:px-75 sm:h-screen">
      <div className="flex flex-col w-auto lg:w-full h-screen justify-center p-5 lg:p-10">
        <div className="flex justify-between items-center">
          <h1 className="!text-2xl pb-4">Cadastrar como {!type ? "Candidato" : "Empresa"} !</h1>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-sm font-medium transition ${
                !type ? "text-black" : "text-gray-400"
              }`}
            >
              Candidato
            </span>

            <button
              type="button"
              onClick={handleCheckboxChange}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 
                ${type ? "bg-black" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  type ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </button>

            <span
              className={`text-sm font-medium transition ${
                type ? "text-black" : "text-gray-400"
              }`}
            >
              Empresa
            </span>
          </div>
        </div>

        <div className="relative min-h-[350px]">
          <AnimatePresence custom={type ? 1 : -1} mode="wait">
            {!type ? (
              <motion.form
                key="candidato"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={-1}
                onSubmit={handleRegister}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6"
              >
                <div className="flex flex-col">
                  <p className="text-lg pb-2">Nome</p>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setname(e.target.value)}
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
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
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
                  {errors.cellphone && (
                    <p className="text-red-500">{errors.cellphone}</p>
                  )}
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
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="text-lg pb-2">CPF</p>
                  <Input
                    required
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Escreva seu CPF"
                  />
                  {errors.cpf && (
                    <p className="text-red-500">{errors.cpf}</p>
                  )}
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
              </motion.form>
            ) : (
              <motion.form
                key="empresa"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={1}
                onSubmit={handleRegister}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6"
              >
                <div className="flex flex-col">
                  <p className="text-lg pb-2">Nome Empresa</p>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Escreva o nome da empresa"
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
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="text-lg pb-2">CNPJ</p>
                  <Input
                    required
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Escreva o CNPJ"
                  />
                  {errors.cpf && (
                    <p className="text-red-500">{errors.cpf}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="text-lg pb-2">E-mail Corporativo</p>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email corporativo"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <p className="text-lg pb-2">Site da empresa</p>
                  <Input
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Link para o Site da empresa"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <p className="text-lg pb-2">Site da empresa</p>
                  <Input
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Link para o Site da empresa"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <p className="text-lg pb-2">Logo da Empresa</p>
                  <Input
                    required
                    type="file"
                    value={file}
                    onChange={(e) => setFile(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <p className="text-lg pb-2">Logo da Empresa</p>
                  <Select 
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Selecione a categoria da sua empresa"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
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
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="flex justify-center gap-2">
          Já possui uma conta?
          <Link className="text-black font-bold" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
