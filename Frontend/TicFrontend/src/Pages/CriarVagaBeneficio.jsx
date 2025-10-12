import React, { useState } from "react";
import Input from "../components/input";
import useApi from "../api/Api";
import { useNavigate, useParams } from "react-router-dom";

function CriarVagaBeneficio() {
    const { id } = useParams()
    const [salario, setSalario] = useState("")
    const [beneficio, setBeneficio] = useState("")
    const [beneficios, setBeneficios] = useState([])
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
                endpoint: `/vagaBeneficio/${id}`,
                method: "POST",
                body: { salario, beneficios },
            });

            navigate(`/criarVaga/Processo/${id}`);
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
                <p>Beneficio</p>
                <Input
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    placeholder="Salario"
                    type="number"
                />
                <div className="flex gap-3">
                    <Input
                        value={beneficio}
                        onChange={(e) => setBeneficio(e.target.value)}
                        placeholder="Adicione um beneficio a para sua vaga"
                    />
                    <button
                        className="bg-black border-2 p-2 rounded-lg text-white text-sm w-50 h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed" 
                        onClick={handleAddBeneficio}
                    >
                        Adicionar Beneficio
                    </button>
                </div>
                <div className="border-1 p-1 rounded-lg min-h-20">
                    {beneficios.length > 0 && (
                        <ul className="list-disc ml-5 text-gray-700">
                            {beneficios.map((b) => (
                                <li>{b}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black border-2 px-6 rounded-lg text-white text-lg w-full h-15 transition-all duration-500 hover:!bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Criando..." : "Criar"}
                </button>
            </form>
        </>
    )
}

export default CriarVagaBeneficio