import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

function CriarVagaProcesso() {
    const { id } = useParams()
    const [processo, setProcesso] = useState("")
    const [entrevistador, setEntrevistador] = useState("")
    const [time, setTime] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleAddBeneficio = (event) => {
        event.preventDefault();

        if (beneficio.trim() === "") return;

        setBeneficios([...beneficios, beneficio]);
        setBeneficio("");
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (loading) return;

        try {
            setLoading(true);

            const data = await useApi({
                endpoint: `/vagaProcesso/${id}`,
                method: "POST",
                body: { salario, beneficios },
            });

            navigate(`/criarVaga/requisito/${id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleLogin}
                className="flex flex-col w-auto shadow-xl md:w-125 h-auto border-1 rounded-xl justify-center p-5 lg:p-10"
            >
                <p>Processo</p>
                <Input
                    value={processo}
                    onChange={(e) => setProcesso(e.target.value)}
                    placeholder="Como funciona o Processo Seletivo"
                />
                <Input
                    value={entrevistador}
                    onChange={(e) => setEntrevistador(e.target.value)}
                    placeholder="Entrevistador"
                />
                <Input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Quem sera seu time na vaga?"
                />                
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Criando..." : "Criar"}
                </button>
            </form>
        </div>
    )
}

export default CriarVagaProcesso