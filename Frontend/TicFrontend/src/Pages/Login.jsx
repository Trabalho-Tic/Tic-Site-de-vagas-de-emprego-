import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import photoLogin from "../assets/photologin.png";
import useApi from "../api/Api";

// Função de validação
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loading) return;

    // Validação de login e senha
    let formErrors = {};

    if (!validateEmail(login)) formErrors.login = "Email inválido.";
    if (!password) formErrors.password = "A senha é obrigatória.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
  setLoading(true);

  const data = await useApi({
    endpoint: "/auth/login",
    method: "POST",
    body: { email: login, password },
  });

  // Guarda token e dados do usuário
  localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  // 🔹 Verifica o tipo e redireciona
  const user = data.user;
  if (user?.typeUser === "empresa") {
    navigate("/dashboard-company");
  } else if (user?.typeUser === "candidato") {
    navigate("/dashboard-candidato");
  } else {
    navigate("/"); // fallback genérico
  }

} catch (err) {
  console.error(err);
  alert(
    (err?.message?.includes("401") && "Credenciais inválidas.") ||
    "Falha no login. Tente novamente."
  );
  } finally {
    setLoading(false);
}
  };

  return (
    <section className="flex justify-center items-center gap-10 h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-auto shadow-xl md:w-125 h-auto border-1 rounded-xl justify-center p-5 lg:p-10"
      >
        <div>
          <h1 className="!text-2xl pb-8">Bem Vindo !</h1>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Faça seu login</h2>
          <p className="text-sm pb-12"></p>
        </div>
        <div className="pb-12">
          <div className="flex flex-col pb-10">
            <p className="text-lg pb-2">Email</p>
            <Input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Coloque seu email"
            />
            {errors.login && <p className="text-red-500">{errors.login}</p>}
          </div>
          <div className="flex flex-col">
            <p className="text-lg pb-2">Senha</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Coloque sua senha"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
            <Link className="flex justify-end transition-all duration-500 text-black hover:text-gray-700 font-bold">
              Esqueceu sua senha?
            </Link>
          </div>
        </div>
        <div className="pb-8">
          <button
            type="submit"
            disabled={loading}
            className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Login"}
          </button>
        </div>
        <p className="flex justify-center gap-2">
          Ainda não tem uma conta?
          <Link className="text-black font-bold" to={"/register"}>
            Registre-se
          </Link>
        </p>
      </form>
      <img className="hidden lg:flex" src={photoLogin} alt="PhotoLogin" />
    </section>
  );
}

export default Login;
