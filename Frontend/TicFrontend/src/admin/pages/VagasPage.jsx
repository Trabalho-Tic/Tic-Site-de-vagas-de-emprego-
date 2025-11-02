import React, { useState, useEffect } from "react";
import useApi from "../../api/Api";
import Modal from "../../components/Modal";

const vagaVazia = {
  nome: "",
  pais: "",
  cidade: "",
  modelo: "presencial",
  id_company: "", // empresa vinculada
};

export default function VagasPage() {
  const [vagas, setVagas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState(vagaVazia);
  const [modalAberto, setModalAberto] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);
  const [mensagem, setMensagem] = useState("");

  // 🔄 Carregar vagas e empresas
  async function carregarDados() {
    try {
      const [vagasData, empresasData] = await Promise.all([
        useApi({ endpoint: "/Vaga" }),
        useApi({ endpoint: "/company" }),
      ]);
      setVagas(Array.isArray(vagasData) ? vagasData : []);
      setEmpresas(Array.isArray(empresasData) ? empresasData : []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setMensagem("❌ Erro ao carregar vagas ou empresas.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // 🔍 Filtro
  const filtradas = vagas.filter((v) =>
    [v.nome, v.cidade, v.pais]
      .filter(Boolean)
      .some((campo) =>
        campo.toLowerCase().includes(busca.toLowerCase())
      )
  );

  // ➕ Nova
  function novaVaga() {
    setForm(vagaVazia);
    setIdEdicao(null);
    setModalAberto(true);
  }

  // ✏️ Editar
  function editarVaga(v) {
    setForm({
      nome: v.nome,
      pais: v.pais,
      cidade: v.cidade,
      modelo: v.modelo,
      id_company: v.id_company,
    });
    setIdEdicao(v.id);
    setModalAberto(true);
  }

  // ❌ Excluir
  async function excluirVaga(v) {
    if (!confirm(`Excluir ${v.nome}?`)) return;
    try {
      await useApi({ endpoint: `/Vaga/delete/${v.id}`, method: "DELETE" });
      carregarDados();
      setMensagem("✅ Vaga excluída com sucesso.");
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao excluir vaga.");
    }
  }

  // 💾 Criar/Atualizar
  async function salvarVaga(e) {
    e.preventDefault();
    try {
      if (!form.id_company) {
        setMensagem("❌ Selecione uma empresa antes de salvar.");
        return;
      }

      if (idEdicao) {
        await useApi({
          endpoint: `/Vaga/update/${idEdicao}`,
          method: "PUT",
          body: form,
        });
        setMensagem("✅ Vaga atualizada com sucesso!");
      } else {
        await useApi({
          endpoint: "/Vaga/create",
          method: "POST",
          body: form,
        });
        setMensagem("✅ Vaga criada com sucesso!");
      }

      setModalAberto(false);
      carregarDados();
    } catch (err) {
      console.error(err);
      setMensagem(`❌ ${err.message || "Erro ao salvar vaga."}`);
    }
  }

  return (
    <div>
      {/* Feedback */}
      {mensagem && (
        <div className="bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-md mb-4 text-sm">
          {mensagem}
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Vagas</h2>
          <p className="text-gray-600 text-sm">
            Crie, edite e visualize vagas disponíveis no sistema.
          </p>
        </div>
        <button
          onClick={novaVaga}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-500"
        >
          <span className="material-symbols-outlined">add</span>
          Nova Vaga
        </button>
      </div>

      {/* Campo de busca */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-1">Buscar Vagas</h3>
        <p className="text-gray-500 mb-4 text-sm">
          Encontre vagas por nome, cidade ou país.
        </p>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar vagas..."
            className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          Vagas ({filtradas.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-xs uppercase">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Cidade</th>
                <th className="py-3 px-4">País</th>
                <th className="py-3 px-4">Modelo</th>
                <th className="py-3 px-4">Empresa</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((v) => (
                <tr
                  key={v.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{v.nome}</td>
                  <td className="py-3 px-4 text-sm">{v.cidade}</td>
                  <td className="py-3 px-4 text-sm">{v.pais}</td>
                  <td className="py-3 px-4 text-sm capitalize">{v.modelo}</td>
                  <td className="py-3 px-4 text-sm">
                    {v.company?.nome || "—"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => editarVaga(v)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => excluirVaga(v)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <span className="material-symbols-outlined text-base">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={modalAberto}
        title={idEdicao ? "Editar Vaga" : "Nova Vaga"}
        onClose={() => setModalAberto(false)}
      >
        <form onSubmit={salvarVaga} className="space-y-4">
          {/* Campos de texto */}
          {["nome", "pais", "cidade"].map((campo) => (
            <div key={campo}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {campo}
              </label>
              <input
                type="text"
                value={form[campo]}
                onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
                required
                className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          {/* Modelo */}
          <div>
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <select
              value={form.modelo}
              onChange={(e) => setForm({ ...form, modelo: e.target.value })}
              className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="presencial">Presencial</option>
              <option value="híbrido">Híbrido</option>
              <option value="remoto">Remoto</option>
            </select>
          </div>

          {/* Empresa (select inteligente) */}
          <div>
            <label className="block text-sm font-medium mb-1">Empresa</label>
            <select
              value={form.id_company}
              onChange={(e) =>
                setForm({ ...form, id_company: e.target.value })
              }
              required
              className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Selecione uma empresa...</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nome} — {empresa.cnpj}
                </option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
