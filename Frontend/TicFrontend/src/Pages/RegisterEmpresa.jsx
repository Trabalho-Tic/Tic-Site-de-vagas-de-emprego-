import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Select from "../components/select";
import useApi from "../api/Api";

// 🧩 Funções de validação inline
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateCnpj = (cnpj) => /^\d{14}$/.test(cnpj.replace(/\D/g, ""));
const validatePassword = (password) => password.length >= 6;

function RegisterEmpresa() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [sobre, setSobre] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 🧭 Submissão
  const handleRegisterCompany = async (e) => {
    e.preventDefault();

    if (loading) return;
    setErrors({});

    // 🔍 Validações inline apenas dos campos principais
    let formErrors = {};

    if (!nome.trim()) formErrors.nome = "O nome da empresa é obrigatório.";
    if (!validateEmail(email)) formErrors.email = "Email inválido.";
    if (!validatePassword(password)) formErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    if (!validateCnpj(cnpj)) formErrors.cnpj = "CNPJ inválido (14 dígitos).";
    if (!categoria.trim()) formErrors.categoria = "Selecione a categoria.";

    // 🚫 Bloqueia o POST se houver erro
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.warn("🚫 Dados inválidos — requisição não enviada.");
      return;
    }

    try {
      setLoading(true);

      // 🧩 1ª etapa → criar usuário base
      const user = await useApi({
        endpoint: "/user/create",
        method: "POST",
        body: {
          nome,
          email,
          password,
          typeUser: "empresa",
        },
      });

      // 🧩 2ª etapa → criar empresa vinculada ao usuário
      const response = await useApi({
        endpoint: "/company/create",
        method: "POST",
        body: {
          nome,
          cnpj,
          logo: file || null,
          url_site: url || null,
          email,
          category: categoria,
          pais: pais || null,
          cidade: cidade || null,
          sobre: sobre || null,
          id_user: user.id,
        },
      });

      if (response?.id_user) {
        navigate("/login");
      } else {
        setErrors({ general: "Erro ao registrar empresa. Tente novamente." });
      }
    } catch (err) {
      console.error(err);
      const msg = err?.message?.toLowerCase() || "";

      if (msg.includes("email")) setErrors({ email: "Este e-mail já está em uso." });
      else if (msg.includes("cnpj")) setErrors({ cnpj: "Este CNPJ já está em uso." });
      else setErrors({ general: "Erro ao registrar. Verifique os dados e tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center py-10 justify-center h-full md:h-screen transition-all duration-300">
      <div className="flex flex-col w-auto lg:w-full gap-10 justify-center p-5 lg:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="!text-2xl pb-4 text-center">Cadastro de Empresa</h1>
        </div>

        <form
          onSubmit={handleRegisterCompany}
          className="grid grid-cols-1 md:w-full md:px-20 lg:grid-cols-3 gap-6 pb-6"
        >
          {/* Nome da Empresa */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">Nome da Empresa *</p>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: TechIncluir"
            />
            {errors.nome && <p className="text-red-500">{errors.nome}</p>}
          </div>

          {/* E-mail Corporativo */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">E-mail Corporativo *</p>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@empresa.com"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Senha */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">Senha *</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {/* CNPJ */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">CNPJ *</p>
            <Input
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Apenas números"
            />
            {errors.cnpj && <p className="text-red-500">{errors.cnpj}</p>}
          </div>

          {/* Categoria */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">Categoria *</p>
            <Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              options={[
                { label: "Selecione...", value: "" },
                { label: "Tecnologia", value: "Tecnologia" },
                { label: "Saúde", value: "Saúde" },
                { label: "Educação", value: "Educação" },
                { label: "Comércio", value: "Comércio" },
                { label: "Outros", value: "Outros" },
              ]}
            />
            {errors.categoria && <p className="text-red-500">{errors.categoria}</p>}
          </div>

          {/* Campos opcionais */}
          <div className="flex flex-col">
            <p className="text-lg pb-2">Site da Empresa (opcional)</p>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://minhaempresa.com.br"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">Logo (opcional)</p>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0]?.name || "")}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">País (opcional)</p>
            <Input
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              placeholder="Ex: Brasil"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg pb-2">Cidade (opcional)</p>
            <Input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Ex: Varginha"
            />
          </div>

          <div className="flex flex-col lg:col-span-3">
            <p className="text-lg pb-2">Sobre (opcional)</p>
            <Input
              value={sobre}
              onChange={(e) => setSobre(e.target.value)}
              placeholder="Fale brevemente sobre sua empresa"
            />
          </div>

          {/* Erro geral */}
          {errors.general && (
            <p className="text-red-500 text-center lg:col-span-3">{errors.general}</p>
          )}

          {/* Botão */}
          <div className="lg:col-span-3 pb-2">
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

export default RegisterEmpresa;
