import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Select from "../components/select";
import useApi from "../api/Api";
import { motion, AnimatePresence } from "framer-motion";

// Validações
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateCpf = (cpf) => /^\d{11}$/.test(cpf.replace(/\D/g, ""));
const validatePhone = (phone) => /^[0-9]{10,11}$/.test(phone);
const validatePassword = (password) => password.length >= 6;

function Register() {
  const [isCompany, setIsCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Campos comuns
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");

  // Candidato
  const [cpf, setCpf] = useState("");

  // Empresa
  const [cnpj, setCnpj] = useState("");
  const [url_site, setUrlSite] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [sobre, setSobre] = useState("");

  // Troca entre os modos
  const toggleType = () => setIsCompany((prev) => !prev);

  // Criação geral
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    let formErrors = {};

    if (!validateEmail(email)) formErrors.email = "Email inválido.";
    if (!validatePassword(password)) formErrors.password = "Mínimo 6 caracteres.";
    if (!validatePhone(telefone)) formErrors.telefone = "Telefone inválido.";

    if (!isCompany && !validateCpf(cpf)) formErrors.cpf = "CPF inválido.";
    if (isCompany && !cnpj) formErrors.cnpj = "CNPJ é obrigatório.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Cria o usuário base
      const user = await useApi({
        endpoint: "/user/create",
        method: "POST",
        body: {
          nome,
          email,
          password,
          telefone,
          typeUser: isCompany ? "empresa" : "candidato",
        },
      });

      const id_user = user.id;
      console.log("User criado:", id_user);

      // 2️⃣ Cria Candidato ou Empresa associada
      if (isCompany) {
        await useApi({
          endpoint: "/company/create",
          method: "POST",
          body: {
            id_user,
            nome,
            cnpj,
            logo,
            url_site,
            email,
            category,
            pais,
            cidade,
            sobre,
          },
        });
      } else {
        await useApi({
          endpoint: "/candidato/create",
          method: "POST",
          body: {
            id_user,
            cpf,
            deficiencias: {},
          },
        });
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Animação
  const formVariants = {
    initial: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <section className="flex flex-col items-center py-10 justify-center h-full md:h-screen transition-all duration-300">
      <div className="flex flex-col w-auto lg:w-full gap-10 justify-center p-5 lg:p-10">
        {/* Header Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="!text-2xl pb-4">
            Cadastrar como {isCompany ? "Empresa" : "Candidato"}!
          </h1>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-sm font-medium ${
                !isCompany ? "text-black" : "text-gray-400"
              }`}
            >
              Candidato
            </span>
            <button
              type="button"
              onClick={toggleType}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                isCompany ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isCompany ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </button>
            <span
              className={`text-sm font-medium ${
                isCompany ? "text-black" : "text-gray-400"
              }`}
            >
              Empresa
            </span>
          </div>
        </div>

        {/* Formulário */}
        <div className="flex flex-col items-center min-h-[350px]">
          <AnimatePresence custom={isCompany ? 1 : -1} mode="wait">
            {!isCompany ? (
              // Form Candidato
              <motion.form
                key="candidato"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={-1}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:w-full md:px-20 lg:grid-cols-2 gap-6 pb-6"
              >
                <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <Input
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <Input
                  label="Telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  error={errors.telefone}
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <Input
                  label="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  error={errors.cpf}
                />
                <div className="lg:col-span-2 pb-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Registrando..." : "Registrar"}
                  </button>
                </div>
              </motion.form>
            ) : (
              // Form Empresa
              <motion.form
                key="empresa"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={1}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:w-full md:px-20 lg:grid-cols-3 gap-6 pb-6"
              >
                <Input label="Nome da Empresa" value={nome} onChange={(e) => setNome(e.target.value)} />
                <Input
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <Input label="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                <Input label="Email Corporativo" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Site da Empresa" value={url_site} onChange={(e) => setUrlSite(e.target.value)} />
                <Input label="Logo (URL)" value={logo} onChange={(e) => setLogo(e.target.value)} />
                <Input label="País" value={pais} onChange={(e) => setPais(e.target.value)} />
                <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                <Input label="Sobre" value={sobre} onChange={(e) => setSobre(e.target.value)} />
                <Select
                  label="Categoria"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <div className="lg:col-span-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Registrando..." : "Registrar"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="relative justify-center gap-2">
        Já possui uma conta?
        <Link className="text-black font-bold" to={"/login"}>
          Login
        </Link>
      </p>
    </section>
  );
}

export default Register;
