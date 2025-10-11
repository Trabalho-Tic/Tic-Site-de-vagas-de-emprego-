import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate } from "react-router-dom";

function CriarVagaCompleta() {
    const [nome, setNome] = useState("")
    const [pais, setPais] = useState("")
    const [cidade, setCidade] = useState("")
    const [modelo, setModelo] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (loading) return;

        try {
            setLoading(true);

            const data = await useApi({
                endpoint: "/vaga/create",
                method: "POST",
                body: { nome, pais, cidade, modelo },
            });

            console.log(data)

            navigate(`/criarVaga/${data.id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <form
                onSubmit={handleLogin}
                className="flex flex-col w-auto shadow-xl md:w-125 h-auto border-1 rounded-xl justify-center p-5 lg:p-10"
            >
                <p>Descrição</p>
                <Input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome Da Vaga"
                />
                <Input
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    placeholder="Pais da vaga"
                />
                <Input
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Cidade da vaga: Exemplo - Franca - SP"
                />
                <Input
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    placeholder="Coloque o modelo da vaga"
                />
                <Input
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    placeholder="Coloque o modelo da vaga"
                />
                <Input
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    placeholder="Coloque o modelo da vaga"
                />
                <Input
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    placeholder="Coloque o modelo da vaga"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="!bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Criando..." : "Criar"}
                </button>
            </form>
        </>
    )
}

export default CriarVagaCompleta