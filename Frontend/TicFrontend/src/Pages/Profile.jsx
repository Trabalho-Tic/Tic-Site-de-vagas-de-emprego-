import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/input";
import { Pencil, Trash, Download, Plus, X } from "lucide-react";
import useApi from "../api/Api";
import { Link, useNavigate } from "react-router-dom";

/**
 * Página de Perfil do Candidato – estilo Sólides
 * - 3 colunas
 * - Cards com edição inline
 * - Integração com /buscarCurriculo/:id e /updateCurriculo/:id
 * - Botão para ir ao "Meu Currículo" (sua página completa de criação/edição)
 * - Mini-Modal para editar dados básicos do usuário via /user/update/:id
 */

function Avatar({ name = "" }) {
  const initials = useMemo(() => {
    const parts = (name || "").trim().split(" ");
    const i1 = parts[0]?.[0] || "";
    const i2 = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (i1 + i2).toUpperCase();
  }, [name]);

  return (
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-md select-none">
      {initials || "?"}
    </div>
  );
}

function Section({ title, onEdit, children, rightAction, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          {rightAction}
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            >
              <Pencil size={16} />
              Editar
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
      {children}
      {onRemove && (
        <button onClick={onRemove} className="text-purple-700/80 hover:text-purple-900">
          <X size={14} />
        </button>
      )}
    </span>
  );
}

function Divider() {
  return <hr className="border-gray-200 my-4" />;
}

/** Modal simples p/ editar dados do usuário */
function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{footer}</div>}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // dados do currículo
  const [loading, setLoading] = useState(true);
  const [existeCurriculo, setExisteCurriculo] = useState(false);
  const [arquivoAtual, setArquivoAtual] = useState("");

  const [resumo, setResumo] = useState("");
  const [experiencias, setExperiencias] = useState([]); // [{cargo,empresa,dataInicio,dataFim,atividade}]
  const [formacao, setFormacao] = useState([]);         // [{curso,instituicao,nivel,conclusao}]
  const [cursos, setCursos] = useState([]);             // [{cursoB,instituicaoB,nivelB,conclusaoB,descricao}]
  const [habilidades, setHabilidades] = useState([]);   // ["Excel","Python"]

  // estados de edição inline
  const [editResumo, setEditResumo] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editCursos, setEditCursos] = useState(false);
  const [editHabs, setEditHabs] = useState(false);

  // Modal de edição de dados básicos do usuário
  const [openUserModal, setOpenUserModal] = useState(false);
  const [userDraft, setUserDraft] = useState({ nome: "", cidade: "", estado: "", telefone: "", linkedin: "", github: "", portfolio: "" });

  const safeParse = (val) => {
    try {
      return Array.isArray(val) ? val : JSON.parse(val || "[]");
    } catch {
      return [];
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const u = JSON.parse(localStorage.getItem("user"));
        if (!u) {
          navigate("/login");
          return;
        }
        setUser(u);

        // redireciona empresas para o /profile (outra visão), se essa for sua regra
        if (u?.tipo === "empresa") {
          navigate("/profile");
          return;
        }

        // carrega currículo
        const data = await useApi({ endpoint: `/buscarCurriculo/${u.id}` });

        if (data && !data.error) {
          setResumo(data.resumoProf || "");
          setExperiencias(safeParse(data.experiencias));
          setFormacao(safeParse(data.formacao));
          setCursos(safeParse(data.cursos));
          setHabilidades(safeParse(data.habilidades));
          setArquivoAtual(data.curriculo || "");
          setExisteCurriculo(true);
        } else {
          setExisteCurriculo(false);
        }

        // rascunho de usuário p/ modal
        setUserDraft((prev) => ({
          ...prev,
          nome: u?.nome || u?.name || "",
          cidade: u?.cidade || "",
          estado: u?.estado || "",
          telefone: u?.telefone || "",
          linkedin: u?.linkedin || "",
          github: u?.github || "",
          portfolio: u?.portfolio || "",
        }));
      } catch (e) {
        console.error(e);
        setExisteCurriculo(false);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  const optionsNivel = [
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

  // --------- Helpers de edição de listas ----------
  const addExperiencia = () => {
    setExperiencias([
      ...experiencias,
      { cargo: "", empresa: "", dataInicio: "", dataFim: "", atividade: "" },
    ]);
  };
  const removeExperiencia = (i) => setExperiencias(experiencias.filter((_, idx) => idx !== i));

  const addFormacao = () => {
    setFormacao([...formacao, { curso: "", instituicao: "", nivel: "", conclusao: "" }]);
  };
  const removeFormacao = (i) => setFormacao(formacao.filter((_, idx) => idx !== i));

  const addCurso = () => {
    setCursos([...cursos, { cursoB: "", instituicaoB: "", nivelB: "", conclusaoB: "", descricao: "" }]);
  };
  const removeCurso = (i) => setCursos(cursos.filter((_, idx) => idx !== i));

  const [novaHab, setNovaHab] = useState("");
  const addHab = () => {
    const v = (novaHab || "").trim();
    if (!v) return;
    setHabilidades([...habilidades, v]);
    setNovaHab("");
  };
  const removeHab = (i) => setHabilidades(habilidades.filter((_, idx) => idx !== i));

  // --------- Salvar tudo do currículo ----------
  const salvarCurriculo = async () => {
    if (!user) return;
    try {
      await useApi({
        endpoint: `/updateCurriculo/${user.id}`,
        method: "PUT",
        body: {
          resumoProf: resumo,
          experiencias,
          formacao,
          cursos,
          habilidades,
        },
      });
      setEditResumo(false);
      setEditExp(false);
      setEditForm(false);
      setEditCursos(false);
      setEditHabs(false);
      alert("✅ Perfil atualizado com sucesso!");
    } catch (e) {
      console.error(e);
      alert("❌ Erro ao salvar seu perfil.");
    }
  };

  // --------- Salvar dados básicos do usuário ----------
  const salvarUsuarioBasico = async () => {
    if (!user) return;
    try {
      const payload = {
        nome: userDraft.nome,
        cidade: userDraft.cidade,
        estado: userDraft.estado,
        telefone: userDraft.telefone,
        linkedin: userDraft.linkedin,
        github: userDraft.github,
        portfolio: userDraft.portfolio,
      };

      await useApi({
        endpoint: `/user/update/${user.id}`,
        method: "PUT",
        body: payload,
      });

      // atualiza localStorage (evita mismatch visual)
      const updatedUser = { ...user, ...payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setOpenUserModal(false);
      alert("✅ Dados pessoais atualizados!");
    } catch (e) {
      console.error(e);
      alert("❌ Não foi possível atualizar seus dados.");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="py-16 text-center text-gray-500">Carregando perfil…</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-[calc(100vh-200px)] bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-6">
            {/* COLUNA ESQUERDA: Perfil básico */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
              <div className="flex flex-col items-center text-center">
                <Avatar name={user?.nome || user?.name} />
                <h1 className="mt-4 text-xl font-bold text-gray-900">
                  {user?.nome || user?.name || "Seu nome"}
                </h1>
                <p className="text-gray-500 text-sm">
                  {user?.cidade ? `${user.cidade}${user?.estado ? `, ${user.estado}` : ""}` : "Cidade não informada"}
                </p>

                <Divider />

                <div className="w-full text-left text-sm text-gray-700 space-y-2">
                  <p><span className="font-semibold">E-mail:</span> {user?.email || "-"}</p>
                  <p><span className="font-semibold">Telefone:</span> {user?.telefone || "-"}</p>
                  {user?.linkedin && (
                    <p className="truncate">
                      <span className="font-semibold">LinkedIn:</span>{" "}
                      <a className="text-indigo-600 hover:underline" href={user.linkedin} target="_blank" rel="noreferrer">
                        {user.linkedin}
                      </a>
                    </p>
                  )}
                  {user?.github && (
                    <p className="truncate">
                      <span className="font-semibold">GitHub:</span>{" "}
                      <a className="text-indigo-600 hover:underline" href={user.github} target="_blank" rel="noreferrer">
                        {user.github}
                      </a>
                    </p>
                  )}
                  {user?.portfolio && (
                    <p className="truncate">
                      <span className="font-semibold">Portfólio:</span>{" "}
                      <a className="text-indigo-600 hover:underline" href={user.portfolio} target="_blank" rel="noreferrer">
                        {user.portfolio}
                      </a>
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setOpenUserModal(true)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Pencil size={16} />
                  Editar dados
                </button>

                <Link
                  to="/meu-curriculo"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white hover:opacity-90 transition"
                >
                  Editar currículo completo
                </Link>

                {arquivoAtual && (
                  <a
                    href={`http://localhost:8000/uploads/${arquivoAtual}`} // ajuste o prefixo público dos uploads aqui
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md bg-white border hover:bg-gray-50 transition"
                  >
                    <Download size={16} />
                    Baixar currículo
                  </a>
                )}
              </div>
            </div>

            {/* COLUNA CENTRAL: Conteúdo principal */}
            <div className="space-y-6">
              {/* SOBRE VOCÊ */}
              <Section
                title="Sobre você"
                onEdit={() => setEditResumo((v) => !v)}
                rightAction={null}
              >
                {!editResumo ? (
                  <p className="text-gray-700 whitespace-pre-wrap">{resumo || "Sem resumo cadastrado."}</p>
                ) : (
                  <textarea
                    className="w-full min-h-[120px] p-4 border rounded-lg"
                    value={resumo}
                    onChange={(e) => setResumo(e.target.value)}
                    placeholder="Escreva um breve resumo sobre sua trajetória, objetivos e principais competências."
                  />
                )}
              </Section>

              {/* EXPERIÊNCIAS */}
              <Section
                title="Experiências"
                onEdit={() => setEditExp((v) => !v)}
                rightAction={
                  editExp && (
                    <button onClick={addExperiencia} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
                      <Plus size={16} /> Adicionar
                    </button>
                  )
                }
              >
                {(!experiencias || experiencias.length === 0) && !editExp && (
                  <p className="text-gray-500">Nenhuma experiência cadastrada.</p>
                )}
                {(!experiencias || experiencias.length === 0) && editExp && (
                  <p className="text-gray-500 mb-3">Adicione sua primeira experiência:</p>
                )}

                <div className="space-y-4">
                  {experiencias.map((exp, idx) => (
                    <div key={idx} className="border rounded-xl p-4">
                      {!editExp ? (
                        <>
                          <p className="font-semibold text-gray-900">{exp.cargo || "Cargo não informado"}</p>
                          <p className="text-gray-700">{exp.empresa || "Empresa"}</p>
                          <p className="text-gray-500 text-sm">
                            {exp.dataInicio || "Início"} — {exp.dataFim || "Atual"}
                          </p>
                          {exp.atividade && <p className="mt-2 text-gray-700 whitespace-pre-wrap">{exp.atividade}</p>}
                        </>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input placeholder="Cargo" value={exp.cargo || ""} onChange={(e) => {
                            const v = [...experiencias]; v[idx].cargo = e.target.value; setExperiencias(v);
                          }} />
                          <Input placeholder="Empresa" value={exp.empresa || ""} onChange={(e) => {
                            const v = [...experiencias]; v[idx].empresa = e.target.value; setExperiencias(v);
                          }} />
                          <Input type="date" placeholder="Início" value={exp.dataInicio || ""} onChange={(e) => {
                            const v = [...experiencias]; v[idx].dataInicio = e.target.value; setExperiencias(v);
                          }} />
                          <Input type="date" placeholder="Término" value={exp.dataFim || ""} onChange={(e) => {
                            const v = [...experiencias]; v[idx].dataFim = e.target.value; setExperiencias(v);
                          }} />
                          <textarea
                            placeholder="Atividades"
                            className="md:col-span-2 w-full min-h-[90px] p-3 border rounded-lg"
                            value={exp.atividade || ""}
                            onChange={(e) => {
                              const v = [...experiencias]; v[idx].atividade = e.target.value; setExperiencias(v);
                            }}
                          />
                          <div className="md:col-span-2 flex justify-end">
                            <button
                              onClick={() => removeExperiencia(idx)}
                              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                              type="button"
                            >
                              <Trash size={16} /> remover
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                                         ))}
                </div>
              </Section>

              {/* FORMAÇÃO */}
              <Section
                title="Formação"
                onEdit={() => setEditForm((v) => !v)}
                rightAction={
                  editForm && (
                    <button onClick={addFormacao} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
                      <Plus size={16} /> Adicionar
                    </button>
                  )
                }
              >
                {(!formacao || formacao.length === 0) && !editForm && (
                  <p className="text-gray-500">Nenhuma formação cadastrada.</p>
                )}

                <div className="space-y-4">
                  {formacao.map((f, idx) => (
                    <div key={idx} className="border rounded-xl p-4">
                      {!editForm ? (
                        <>
                          <p className="font-semibold text-gray-900">{f.curso || "Curso"}</p>
                          <p className="text-gray-700">{f.instituicao || "Instituição"}</p>
                          <p className="text-gray-500 text-sm">
                            {f.nivel || "-"} • {f.conclusao || "ano"}
                          </p>
                        </>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input placeholder="Curso" value={f.curso || ""} onChange={(e) => {
                            const v = [...formacao]; v[idx].curso = e.target.value; setFormacao(v);
                          }} />
                          <Input placeholder="Instituição" value={f.instituicao || ""} onChange={(e) => {
                            const v = [...formacao]; v[idx].instituicao = e.target.value; setFormacao(v);
                          }} />
                          <select
                            className="border rounded-lg px-3 h-[42px]"
                            value={f.nivel || ""}
                            onChange={(e) => { const v = [...formacao]; v[idx].nivel = e.target.value; setFormacao(v); }}
                          >
                            <option value="">Selecione o nível</option>
                            {optionsNivel.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <Input placeholder="Ano de conclusão" value={f.conclusao || ""} onChange={(e) => {
                            const v = [...formacao]; v[idx].conclusao = e.target.value; setFormacao(v);
                          }} />
                          <div className="md:col-span-2 flex justify-end">
                            <button
                              onClick={() => removeFormacao(idx)}
                              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                              type="button"
                            >
                              <Trash size={16} /> remover
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* CURSOS E CERTIFICAÇÕES */}
              <Section
                title="Cursos e certificações"
                onEdit={() => setEditCursos((v) => !v)}
                rightAction={
                  editCursos && (
                    <button onClick={addCurso} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
                      <Plus size={16} /> Adicionar
                    </button>
                  )
                }
              >
                {(!cursos || cursos.length === 0) && !editCursos && (
                  <p className="text-gray-500">Nenhum curso/certificação cadastrado.</p>
                )}

                <div className="space-y-4">
                  {cursos.map((c, idx) => (
                    <div key={idx} className="border rounded-xl p-4">
                      {!editCursos ? (
                        <>
                          <p className="font-semibold text-gray-900">{c.cursoB || "Curso"}</p>
                          <p className="text-gray-700">{c.instituicaoB || "Instituição"}</p>
                          <p className="text-gray-500 text-sm">{c.nivelB || "-"} • {c.conclusaoB || "ano"}</p>
                          {c.descricao && <p className="mt-2 text-gray-700 whitespace-pre-wrap">{c.descricao}</p>}
                        </>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input placeholder="Curso" value={c.cursoB || ""} onChange={(e) => {
                            const v = [...cursos]; v[idx].cursoB = e.target.value; setCursos(v);
                          }} />
                          <Input placeholder="Instituição" value={c.instituicaoB || ""} onChange={(e) => {
                            const v = [...cursos]; v[idx].instituicaoB = e.target.value; setCursos(v);
                          }} />
                          <select
                            className="border rounded-lg px-3 h-[42px]"
                            value={c.nivelB || ""}
                            onChange={(e) => { const v = [...cursos]; v[idx].nivelB = e.target.value; setCursos(v); }}
                          >
                            <option value="">Selecione</option>
                            <option value="Certificação">Certificação</option>
                            <option value="Curso">Curso</option>
                          </select>
                          <Input placeholder="Ano de conclusão" value={c.conclusaoB || ""} onChange={(e) => {
                            const v = [...cursos]; v[idx].conclusaoB = e.target.value; setCursos(v);
                          }} />
                          <textarea
                            placeholder="Descrição (opcional)"
                            className="md:col-span-2 w-full min-h-[90px] p-3 border rounded-lg"
                            value={c.descricao || ""}
                            onChange={(e) => { const v = [...cursos]; v[idx].descricao = e.target.value; setCursos(v); }}
                          />
                          <div className="md:col-span-2 flex justify-end">
                            <button
                              onClick={() => removeCurso(idx)}
                              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                              type="button"
                            >
                              <Trash size={16} /> remover
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* HABILIDADES */}
              <Section title="Habilidades" onEdit={() => setEditHabs((v) => !v)}>
                {!editHabs ? (
                  <div>
                    {(!habilidades || habilidades.length === 0) && (
                      <p className="text-gray-500">Nenhuma habilidade cadastrada.</p>
                    )}
                    <div className="flex flex-wrap">
                      {habilidades.map((h, idx) => (
                        <Chip key={`${h}-${idx}`} onRemove={() => removeHab(idx)}>{h}</Chip>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-3">
                      <Input placeholder="Ex.: Inglês, Excel, Acessibilidade…" value={novaHab} onChange={(e) => setNovaHab(e.target.value)} />
                      <button
                        onClick={addHab}
                        type="button"
                        className="inline-flex items-center gap-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus size={16} /> Adicionar
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap">
                      {habilidades.map((h, idx) => (
                        <Chip key={`${h}-${idx}`} onRemove={() => removeHab(idx)}>{h}</Chip>
                      ))}
                    </div>
                  </div>
                )}
              </Section>

              {/* BOTÃO SALVAR ALTERAÇÕES */}
              <div className="flex justify-end">
                <button
                  onClick={salvarCurriculo}
                  className="inline-flex items-center justify-center h-[52px] px-6 bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Salvar alterações
                </button>
              </div>
            </div>

            {/* COLUNA DIREITA: Extras */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumo</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Experiências: <span className="font-semibold">{experiencias?.length || 0}</span></li>
                  <li>Formações: <span className="font-semibold">{formacao?.length || 0}</span></li>
                  <li>Cursos/Certificações: <span className="font-semibold">{cursos?.length || 0}</span></li>
                  <li>Habilidades: <span className="font-semibold">{habilidades?.length || 0}</span></li>
                </ul>
                {arquivoAtual && (
                  <a
                    href={`http://localhost:8000/uploads/${arquivoAtual}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-white border hover:bg-gray-50 transition"
                  >
                    <Download size={16} />
                    Baixar currículo
                  </a>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ações rápidas</h3>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/meu-curriculo"
                    className="inline-flex items-center justify-center h-[44px] px-4 rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    Abrir editor de currículo
                  </Link>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center justify-center h-[44px] px-4 rounded-lg bg-white border hover:bg-gray-50"
                  >
                    Voltar ao topo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: editar dados do usuário */}
      <Modal
        open={openUserModal}
        title="Editar dados do usuário"
        onClose={() => setOpenUserModal(false)}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpenUserModal(false)} className="px-4 py-2 rounded-md bg-white border hover:bg-gray-50">
              Cancelar
            </button>
            <button onClick={salvarUsuarioBasico} className="px-4 py-2 rounded-md bg-gradient-to-r from-[#6A00FF] to-[#8B5CF6] text-white">
              Salvar
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Nome" value={userDraft.nome} onChange={(e) => setUserDraft({ ...userDraft, nome: e.target.value })} />
          <Input placeholder="Telefone" value={userDraft.telefone} onChange={(e) => setUserDraft({ ...userDraft, telefone: e.target.value })} />
          <Input placeholder="Cidade" value={userDraft.cidade} onChange={(e) => setUserDraft({ ...userDraft, cidade: e.target.value })} />
          <Input placeholder="Estado" value={userDraft.estado} onChange={(e) => setUserDraft({ ...userDraft, estado: e.target.value })} />
          <Input placeholder="LinkedIn (URL)" value={userDraft.linkedin} onChange={(e) => setUserDraft({ ...userDraft, linkedin: e.target.value })} />
          <Input placeholder="GitHub (URL)" value={userDraft.github} onChange={(e) => setUserDraft({ ...userDraft, github: e.target.value })} />
          <Input placeholder="Portfólio (URL)" value={userDraft.portfolio} onChange={(e) => setUserDraft({ ...userDraft, portfolio: e.target.value })} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Campos extras (LinkedIn, GitHub, Portfólio) são opcionais. Se seu backend ainda não possui essas colunas no `User`, posso te passar a alteração no model/DB.
        </p>
      </Modal>

      <Footer />
    </>
  );
}

