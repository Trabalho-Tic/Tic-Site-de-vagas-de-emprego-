import React, { useRef, useState } from "react";
import Input from "../components/input";
import { Trash } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useApi from "../api/Api";
import { useNavigate } from "react-router-dom";

function Curriculo() {

    const [file, setFile] = useState(null);
    const [resumo, setResumo] = useState("");
    const [cargo, setCargo] = useState("")
    const [empresa, setEmpresa] = useState("")
    const [dataInicio, setDataInicio] = useState("")
    const [dataFim, setDataFim] = useState("")
    const [atividade, setAtividade] = useState("")
    const [curso, setCurso] = useState("")
    const [instituicao, setInstituicao] = useState("")
    const [nivel, setNivel] = useState("")
    const [conclusao, setConclusao] = useState("")
    const [cursoB, setCursoB] = useState("")
    const [instituicaoB, setInstituicaoB] = useState("")
    const [nivelB, setNivelB] = useState("")
    const [conclusaoB, setConclusaoB] = useState("")
    const [descricao, setdescricao] = useState("")
    const [cursos, setCursos] = useState([])
    const [cursosB, setCursosB] = useState([])
    const [experiencias, setExperiencias] = useState([])
    const inputRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const options = [
        "Ensino Fundamental",
        "Ensino Médio",
        "Ensino Técnico",
        "Tecnólogo",
        "Graduação",
        "Pós Graduação",
        "MBA",
        "Mestrado",
        "Doutorado",
        "Pós Doutorado"
    ]

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAreaClick = () => {
        inputRef.current.click();
    };

    const handleAddExperiencia = (event) => {
        event.preventDefault();

        const data = {
            cargo,
            empresa,
            dataInicio,
            dataFim,
            atividade,
        }

        setExperiencias([...experiencias, data]);
        setCargo("");
        setEmpresa("");
        setDataFim("");
        setDataInicio("");
        setAtividade("");
    }

    const removeExperiencia = (i) => {
        const novasExperiencias = experiencias.filter((_, index) => index !== i);
        setExperiencias(novasExperiencias);
    };
    
    const handleAddCurso = (event) => {
        event.preventDefault();

        const data = {
            curso,
            instituicao,
            nivel,
            conclusao,
        }

        setCursos([...cursos, data]);
        setCurso("");
        setInstituicao("");
        setNivel("");
        setConclusao("");
    }

    const removeCurso = (i) => {
        const novosCursos = cursos.filter((_, index) => index !== i);
        setCursos(novosCursos);
    };
    
    const handleAddCursoB = (event) => {
        event.preventDefault();

        const data = {
            cursoB,
            instituicaoB,
            nivelB,
            conclusaoB,
            descricao
        }

        setCursosB([...cursosB, data]);
        setCursoB("");
        setInstituicaoB("");
        setNivelB("");
        setConclusaoB("");
        setdescricao("")
    }

    const removeCursoB = (i) => {
        const novosCursos = cursosB.filter((_, index) => index !== i);
        setCursosB(novosCursos);
    };

    const handleCriarCurriculo = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            
            if (file) formData.append("curriculo", file); // nome precisa bater com multer.single("curriculo")
            
            formData.append("resumoProf", resumo);
            formData.append("experiencias", JSON.stringify(experiencias));
            formData.append("formacao", JSON.stringify(cursos));
            formData.append("cursos", JSON.stringify(cursosB));

            const response = await fetch(`http://localhost:8000/criarCurriculo/${user.id}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro no envio:", errorData);
                return;
            }

            navigate("/");
        } catch (error) {
            console.error("Erro ao criar currículo:", error);
        }
    };

    return (
        <>
            <Header />
            
            <div className="pt-10 flex w-full justify-center">
                <h1 className="text-5xl font-bold">Monte seu curriculo agora</h1>
            </div>

            <div className="grid grid-cols-2 justify-center p-10 gap-5 items-center">
                <section className="flex justify-start w-auto h-full bg-gray-50 rounded-xl">
                    <div className="flex flex-col py-10 px-10 w-full">
                        <p className="text-lg font-bold pb-5">Importe o seu curriculo <span className="font-light text-sm">Opcional</span></p>
                        <div
                            onClick={handleAreaClick}
                            className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer select-none"
                        >
                            {
                            !file 
                                ? 
                                <div className="flex bg-gray-200 flex-col items-center shadow-xl justify-center text-gray-500 w-full h-full py-10 rounded-xl transition-all duration-300 hover:bg-gray-100">
                                    <span className="text-sm text-gray-400">
                                        Clique para enviar o currículo
                                    </span>
                                    <span className="text-xs text-gray-400 mt-1">
                                        PDF, DOC, DOCX, PNG, JPG, JPEG
                                    </span>
                                </div> 
                                : 
                                <div className="flex bg-gray-200 flex-col items-center justify-center text-gray-500 w-full h-full py-10 rounded-xl transition-all duration-300 hover:bg-gray-100">
                                    <span className="text-sm text-gray-400">Arquivo Selecionado:</span>
                                    <span className="text-xs text-gray-400 mt-1">{file.name}</span>
                                </div>
                            }
                            {/* Input invisível, mas clicável via ref */}
                            <input
                                ref={inputRef}
                                id="curriculoUpload"
                                type="file"
                                accept=".pdf, .doc, .docx, .png, .jpg, .jpeg"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </section>
                <section className="flex justify-start w-auto bg-gray-50 rounded-xl">
                    <div className="flex flex-col py-10 px-10 w-full">
                        <p className="text-lg font-bold pb-5">Resumo profissional</p>
                        <textarea 
                            placeholder="Escreva um resumo profissional"
                            type="text"
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                            className="bg-white border-1 p-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-full min-h-50"
                        />
                    </div>
                </section>
                <section className="flex justify-start w-auto bg-gray-50 rounded-xl">
                    <div className="flex flex-col py-10 px-10 w-full">
                        <p className="text-lg font-bold pb-5">Experiências</p>
                        <form onSubmit={handleAddExperiencia}>
                            <div className="flex flex-col gap-3 pb-10">
                                
                                <p className="text-sm font-semibold">Cargo</p>
                                <Input
                                    value={cargo}
                                    onChange={(e) => setCargo(e.target.value)}
                                    placeholder="Digite o seu cargo"
                                />

                                <p className="text-sm font-semibold">Empresa</p>
                                <Input
                                    value={empresa}
                                    onChange={(e) => setEmpresa(e.target.value)}
                                    placeholder="Digite o nome da empresa"
                                />

                                <div className="flex gap-5 justify-between">
                                    <div className="w-full">
                                        <p className="text-sm font-semibold">Data de inicio</p>
                                        <Input
                                            value={dataInicio}
                                            type="date"
                                            onChange={(e) => setDataInicio(e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <p className="text-sm font-semibold">Data de termino</p>
                                        <Input
                                            value={dataFim}
                                            type="date"
                                            onChange={(e) => setDataFim(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <p className="text-sm font-semibold">Atividade realizada</p>
                                <textarea
                                    value={atividade}
                                    onChange={(e) => setAtividade(e.target.value)}
                                    placeholder="Conte sobre suas funções"
                                    className="bg-white border-2 p-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-full min-h-50"
                                />

                                <button
                                    type="submit"
                                    className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    Adicionar
                                </button>
                            </div>

                            <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
                                {experiencias.length > 0 ? (
                                    <ul className="list-disc ml-5 space-y-1 break-words">
                                        {experiencias.map((exp, index) => (
                                            <li className="pr-1 flex justify-between items-start" key={index}>
                                            <div>
                                                <span className="font-semibold">{exp.cargo}</span> na <span>{exp.empresa}</span><br />
                                                <span>Entre: {exp.dataInicio} até {exp.dataFim}</span><br />
                                                <span className="italic">{exp.atividade}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeExperiencia(index)}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                <Trash size={16} />
                                            </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 italic">Nenhuma experiência adicionada ainda.</p>
                                )}
                            </div>
                        </form>
                    </div>    
                </section>
                
                <section className="flex justify-start w-auto h-full bg-gray-50 rounded-xl">
                    <div className="flex flex-col py-10 px-10 w-full">
                        <p className="text-lg font-bold pb-5">Quais são suas formações</p>
                        <form onSubmit={handleAddCurso}>
                            <div className="flex flex-col gap-3 pb-10">
                                
                                <p className="text-sm font-semibold">Curso</p>
                                <Input
                                    value={curso}
                                    onChange={(e) => setCurso(e.target.value)}
                                    placeholder="Nome do curso"
                                />

                                <p className="text-sm font-semibold">Instituição de ensino</p>
                                <Input
                                    value={instituicao}
                                    onChange={(e) => setInstituicao(e.target.value)}
                                    placeholder="Nome da instituição"
                                />
                                
                                <p className="text-sm font-semibold">Nivel do Curso</p>
                                <select
                                    value={nivel}
                                    onChange={(e) => setNivel(e.target.value)}
                                    className="bg-white border-2 px-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-full h-15"
                                >
                                    <option className="hidden">Selecione o nivle do Curso</option>
                                    {
                                        options.map((o) => (
                                            <option value={o}>{o}</option>
                                        ))
                                    }
                                </select>

                                <p className="text-sm font-semibold">Ano de conclusão</p>
                                <Input
                                    value={conclusao}
                                    onChange={(e) => setConclusao(e.target.value)}
                                    placeholder="Ex: 2022"
                                />

                                <button
                                    type="submit"
                                    className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    Adicionar
                                </button>
                            </div>

                            <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
                                {cursos.length > 0 ? (
                                    <ul className="list-disc ml-5 space-y-1 break-words">
                                        {cursos.map((cur, index) => (
                                            <li className="pr-1 flex justify-between items-start" key={index}>
                                                <div>
                                                    <p className="text-lg font-bold">{cur.curso}</p>
                                                    <p>Instituição:  {cur.instituicao}</p>
                                                    <p>Nivel: {cur.nivel}</p>
                                                    <p className="italic">Finalizado em: {cur.conclusao}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeCurso(index)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 italic">Nenhuma experiência adicionada ainda.</p>
                                )}
                            </div>
                        </form>
                    </div>    
                </section>

            </div>
            
            <div className="px-100 pb-10">
                <section className="flex justify-start w-auto h-full bg-gray-50 rounded-xl">
                    <div className="flex flex-col py-10 px-10 w-full">
                        <p className="text-lg font-bold pb-5">Cursos e certificações</p>
                        <form onSubmit={handleAddCursoB}>
                            <div className="flex flex-col gap-3 pb-10">
                                
                                <p className="text-sm font-semibold">Curso</p>
                                <Input
                                    value={cursoB}
                                    onChange={(e) => setCursoB(e.target.value)}
                                    placeholder="Nome do curso"
                                />

                                <p className="text-sm font-semibold">Instituição</p>
                                <Input
                                    value={instituicaoB}
                                    onChange={(e) => setInstituicaoB(e.target.value)}
                                    placeholder="Nome da instituição"
                                />
                                
                                <p className="text-sm font-semibold">Nivel</p>
                                <select
                                    value={nivelB}
                                    onChange={(e) => setNivelB(e.target.value)}
                                    className="bg-white border-2 px-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-full h-15"
                                >
                                    <option className="hidden">Selecione o nivel do Curso</option>
                                    <option value="Certificação">Certificação</option>
                                    <option value="Curso">Curso</option>
                                </select>

                                <p className="text-sm font-semibold">Ano de conclusão</p>
                                <Input
                                    value={conclusaoB}
                                    onChange={(e) => setConclusaoB(e.target.value)}
                                    placeholder="Ex: 2022"
                                />

                                <p className="text-sm font-semibold">Descrição das atividades</p>
                                <textarea
                                    value={descricao}
                                    onChange={(e) => setdescricao(e.target.value)}
                                    placeholder="Descreva o seu Curso/Certificado"
                                    className="bg-white border-2 p-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-full min-h-50"
                                />

                                <button
                                    type="submit"
                                    className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    Adicionar
                                </button>
                            </div>

                            <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
                                {cursosB.length > 0 ? (
                                    <ul className="list-disc ml-5 space-y-1 break-words">
                                        {cursosB.map((cur, index) => (
                                            <li className="pr-1 flex justify-between items-start" key={index}>
                                                <div>
                                                    <p className="text-lg font-bold">{cur.cursoB}</p>
                                                    <p>Instituição:  {cur.instituicaoB}</p>
                                                    <p>Nivel: {cur.nivelB}</p>
                                                    <p className="italic">Finalizado em: {cur.conclusaoB}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeCursoB(index)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 italic">Nenhuma experiência adicionada ainda.</p>
                                )}
                            </div>
                        </form>
                    </div>    
                </section>

            </div>
            <div className="px-10 pb-10">
                <button
                    onClick={handleCriarCurriculo}
                    className="h-[60px] w-full px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Adicionar Curriculo
                </button>
            </div>

            <Footer />
        </>
    )
}

export default Curriculo