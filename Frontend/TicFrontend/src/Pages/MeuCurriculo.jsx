import React, { useRef, useState, useEffect } from "react";
import Input from "../components/input";
import { Trash } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useApi from "../api/Api";
import { useNavigate } from "react-router-dom";

function MeuCurriculo() {
  const [file, setFile] = useState(null);
  const [resumo, setResumo] = useState("");
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [atividade, setAtividade] = useState("");

  const [curso, setCurso] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [nivel, setNivel] = useState("");
  const [conclusao, setConclusao] = useState("");

  const [cursoB, setCursoB] = useState("");
  const [instituicaoB, setInstituicaoB] = useState("");
  const [nivelB, setNivelB] = useState("");
  const [conclusaoB, setConclusaoB] = useState("");
  const [descricao, setDescricao] = useState("");

  const [habilidade, setHabilidade] = useState("");

  const [user, setUser] = useState({});
  const [habilidades, setHabilidades] = useState([]);
  const [cursos, setCursos] = useState([]);   // formacao
  const [cursosB, setCursosB] = useState([]); // cursos/certificações
  const [experiencias, setExperiencias] = useState([]);

  const [existeCurriculo, setExisteCurriculo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [arquivoAtual, setArquivoAtual] = useState(""); // nome do arquivo salvo no backend (se houver)

  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
  async function fetchCurriculo() {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u);

      // se for empresa, volta para /profile
      if (u?.tipo === "empresa") {
        navigate("/profile");
        return;
      }

      const data = await useApi({
        endpoint: `/buscarCurriculo/${u.id}`,
      });

      // Função auxiliar que garante que o valor será um array
      const safeParse = (val) => {
        try {
          return Array.isArray(val)
            ? val
            : JSON.parse(val || "[]");
        } catch {
          return [];
        }
      };

      // se encontrar currículo, carrega os dados tratados
      if (data && !data.error) {
        setResumo(data.resumoProf || "");
        setExperiencias(safeParse(data.experiencias));
        setCursos(safeParse(data.formacao));
        setCursosB(safeParse(data.cursos));
        setHabilidades(safeParse(data.habilidades));
        setArquivoAtual(data.curriculo || "");
        setExisteCurriculo(true);
      } else {
        setExisteCurriculo(false);
      }
    } catch (error) {
      // 404 ou erro → entra no modo criação
      console.error("Erro ao buscar currículo:", error);
      setExisteCurriculo(false);
    } finally {
      setLoading(false);
    }
  }

  fetchCurriculo();
}, [navigate]);

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
    "Pós Doutorado",
  ];

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleAreaClick = () => inputRef.current?.click();

  // ====== EXPERIÊNCIAS ======
  const handleAddExperiencia = (event) => {
    event.preventDefault();
    const data = { cargo, empresa, dataInicio, dataFim, atividade };
    setExperiencias([...experiencias, data]);
    setCargo("");
    setEmpresa("");
    setDataInicio("");
    setDataFim("");
    setAtividade("");
  };

  const removeExperiencia = (i) => {
    setExperiencias(experiencias.filter((_, index) => index !== i));
  };

  // ====== FORMAÇÃO (cursos) ======
  const handleAddCurso = (event) => {
    event.preventDefault();
    const data = { curso, instituicao, nivel, conclusao };
    setCursos([...cursos, data]);
    setCurso("");
    setInstituicao("");
    setNivel("");
    setConclusao("");
  };

  const removeCurso = (i) => {
    setCursos(cursos.filter((_, index) => index !== i));
  };

  // ====== CURSOS E CERTIFICAÇÕES (cursosB) ======
  const handleAddCursoB = (event) => {
    event.preventDefault();
    const data = { cursoB, instituicaoB, nivelB, conclusaoB, descricao };
    setCursosB([...cursosB, data]);
    setCursoB("");
    setInstituicaoB("");
    setNivelB("");
    setConclusaoB("");
    setDescricao("");
  };

  const removeCursoB = (i) => {
    setCursosB(cursosB.filter((_, index) => index !== i));
  };

  // ====== HABILIDADES ======
  const handleAddHabilidade = (event) => {
    event.preventDefault();
    if (!habilidade.trim()) return;
    setHabilidades([...habilidades, habilidade.trim()]);
    setHabilidade("");
  };

  const removeHabilidade = (i) => {
    setHabilidades(habilidades.filter((_, index) => index !== i));
  };

  // ====== SALVAR TUDO (botão principal) ======
  const handleSalvar = async () => {
    try {
      if (!existeCurriculo) {
        // CRIAR
        const formData = new FormData();
        if (file) formData.append("curriculo", file);
        formData.append("resumoProf", resumo);
        formData.append("experiencias", JSON.stringify(experiencias));
        formData.append("formacao", JSON.stringify(cursos));
        formData.append("cursos", JSON.stringify(cursosB));
        formData.append("habilidades", JSON.stringify(habilidades));

        await useApi({
          endpoint: `/criarCurriculo/${user.id}`,
          method: "POST",
          body: formData,
          isFormData: true,
        });

        setExisteCurriculo(true);
        if (file) setArquivoAtual(file.name);
        alert("✅ Currículo criado com sucesso!");
        return;
      }

      // ATUALIZAR
      // se trocar arquivo, usa FormData; senão, JSON puro
      if (file) {
        const formData = new FormData();
        formData.append("resumoProf", resumo);
        formData.append("experiencias", JSON.stringify(experiencias));
        formData.append("formacao", JSON.stringify(cursos));
        formData.append("cursos", JSON.stringify(cursosB));
        formData.append("habilidades", JSON.stringify(habilidades));
        formData.append("curriculo", file);

        const updated = await useApi({
          endpoint: `/updateCurriculo/${user.id}`,
          method: "PUT",
          body: formData,
          isFormData: true,
        });

        setArquivoAtual(file.name || arquivoAtual);
        alert("✅ Currículo atualizado com sucesso!");
      } else {
        await useApi({
          endpoint: `/updateCurriculo/${user.id}`,
          method: "PUT",
          body: {
            resumoProf: resumo,
            experiencias,
            formacao: cursos,
            cursos: cursosB,
            habilidades,
          },
        });
        alert("✅ Currículo atualizado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Ocorreu um erro ao salvar seu currículo.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Carregando currículo...
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="pt-10 flex w-full justify-center">
        <h1 className="text-5xl font-bold">
          {existeCurriculo ? "Editar meu currículo" : "Monte seu currículo agora"}
        </h1>
      </div>

      <div className="grid grid-cols-2 justify-center p-10 gap-5 items-center">
        {/* Upload de arquivo */}
        <section className="flex justify-start w-auto h-full bg-gray-50 rounded-xl">
          <div className="flex flex-col py-10 px-10 w-full">
            <p className="text-lg font-bold pb-5">
              Importe o seu currículo <span className="font-light text-sm">Opcional</span>
            </p>
            <div
              onClick={handleAreaClick}
              className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer select-none"
            >
              {!file ? (
                <div className="flex bg-gray-200 flex-col items-center shadow-xl justify-center text-gray-500 w-full h-full py-10 rounded-xl transition-all duration-300 hover:bg-gray-100">
                  <span className="text-sm text-gray-400">
                    {arquivoAtual ? `Atual: ${arquivoAtual}` : "Clique para enviar o currículo"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PDF, DOC, DOCX, PNG, JPG, JPEG
                  </span>
                </div>
              ) : (
                <div className="flex bg-gray-200 flex-col items-center justify-center text-gray-500 w-full h-full py-10 rounded-xl transition-all duration-300 hover:bg-gray-100">
                  <span className="text-sm text-gray-400">Arquivo Selecionado:</span>
                  <span className="text-xs text-gray-400 mt-1">{file.name}</span>
                </div>
              )}
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

        {/* Resumo profissional */}
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

        {/* Experiências */}
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
                    <p className="text-sm font-semibold">Data de início</p>
                    <Input
                      value={dataInicio}
                      type="date"
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-sm font-semibold">Data de término</p>
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
                          <span className="font-semibold">{exp.cargo}</span> na{" "}
                          <span>{exp.empresa}</span>
                          <br />
                          <span>
                            Entre: {exp.dataInicio} até {exp.dataFim}
                          </span>
                          <br />
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

        {/* Formação */}
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

                <p className="text-sm font-semibold">Nível do Curso</p>
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="bg-white border-2 px-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-full h-15"
                >
                  <option className="hidden">Selecione o nível do Curso</option>
                  {options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
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
                          <p>Instituição: {cur.instituicao}</p>
                          <p>Nível: {cur.nivel}</p>
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
                  <p className="text-gray-400 italic">Nenhuma formação adicionada ainda.</p>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Cursos e certificações */}
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

                <p className="text-sm font-semibold">Nível</p>
                <select
                  value={nivelB}
                  onChange={(e) => setNivelB(e.target.value)}
                  className="bg-white border-2 px-6 shadow-xl rounded-lg text-black text-sm w-80 md:w-full h-15"
                >
                  <option className="hidden">Selecione o nível do Curso</option>
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
                  onChange={(e) => setDescricao(e.target.value)}
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
                          <p>Instituição: {cur.instituicaoB}</p>
                          <p>Nível: {cur.nivelB}</p>
                          <p className="italic">Finalizado em: {cur.conclusaoB}</p>
                          {cur.descricao ? <p className="text-sm mt-1">{cur.descricao}</p> : null}
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
                  <p className="text-gray-400 italic">Nenhum curso/certificação adicionado.</p>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Habilidades */}
        <section className="flex flex-col p-10 gap-5 justify-start w-auto h-full bg-gray-50 rounded-xl">
          <p className="text-sm font-semibold">Coloque suas habilidades</p>
          <div className="flex gap-5">
            <Input
              value={habilidade}
              onChange={(e) => setHabilidade(e.target.value)}
              placeholder="Ex.: Inglês, Excel, Acessibilidade, Libras..."
            />

            <button
              type="button"
              onClick={handleAddHabilidade}
              className="h-[60px] px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Adicionar
            </button>
          </div>

          <div className="border border-gray-300 rounded-md p-3 min-h-[83px] text-gray-700">
            {habilidades.length > 0 ? (
              <ul className="list-disc ml-5 space-y-1 break-words">
                {habilidades.map((hab, index) => (
                  <li className="pr-1 flex justify-between items-start" key={index}>
                    <div>
                      <p className="text-lg font-bold">{hab}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHabilidade(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">Nenhuma habilidade adicionada ainda.</p>
            )}
          </div>
        </section>
      </div>

      <div className="px-10 pb-10">
        <button
          onClick={handleSalvar}
          className="h-[60px] w-full px-4 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {existeCurriculo ? "Salvar alterações" : "Criar currículo"}
        </button>
      </div>

      <Footer />
    </>
  );
}

export default MeuCurriculo;
