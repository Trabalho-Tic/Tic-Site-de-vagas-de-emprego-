import React, { useState, useEffect } from "react";
import useApi from "../../api/Api";
import Modal from "../../components/Modal";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState({});
  const [idEdicao, setIdEdicao] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState(""); // ✅ feedback via texto

  const usuarioVazio = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    password: "",
    typeUser: "candidato",
    deficiencias: [],
  };

  // 🟢 Buscar usuários
  async function carregarUsuarios() {
    try {
      const data = await useApi({ endpoint: "/user" });
      setUsuarios(data);
    } catch (err) {
      setMensagem("❌ Erro ao carregar usuários.");
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // 🔍 Filtro
  const filtrados = usuarios.filter(
    (u) =>
      u.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      u.email?.toLowerCase().includes(busca.toLowerCase()) ||
      u.cpf?.includes(busca)
  );

  // ✏️ Editar
  function editarUsuario(u) {
    setForm(u);
    setIdEdicao(u.id);
    setModalAberto(true);
  }

  // ➕ Novo
  function novoUsuario() {
    setForm(usuarioVazio);
    setIdEdicao(null);
    setModalAberto(true);
  }

  // ❌ Excluir
  async function excluirUsuario(u) {
    if (!confirm(`Excluir ${u.nome}?`)) return;
    try {
      await useApi({ endpoint: `/user/delete/${u.id}`, method: "DELETE" });
      carregarUsuarios();
      setMensagem("✅ Usuário excluído com sucesso.");
    } catch {
      setMensagem("❌ Erro ao excluir usuário.");
    }
  }

  // 💾 Criar / Atualizar
  async function salvarUsuario(e) {
    e.preventDefault();
    try {
      if (idEdicao) {
        await useApi({
          endpoint: `/user/update/${idEdicao}`,
          method: "PUT",
          body: form,
        });
        setMensagem("✅ Usuário atualizado com sucesso!");
      } else {
        await useApi({
          endpoint: "/user/create",
          method: "POST",
          body: form,
        });
        setMensagem("✅ Usuário criado com sucesso!");
      }
      setModalAberto(false);
      carregarUsuarios();
    } catch (err) {
      setMensagem(`❌ ${err.message || "Erro ao salvar usuário."}`);
    }
  }

  return (
    <div>
      {/* Mensagem simples de feedback */}
      {mensagem && (
        <div className="bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-md mb-4 text-sm">
          {mensagem}
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
          <p className="text-gray-600 text-sm">
            Adicione, edite ou remova usuários do sistema.
          </p>
        </div>
        <button
          onClick={novoUsuario}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-500"
        >
          <span className="material-symbols-outlined">add</span>
          Novo Usuário
        </button>
      </div>

      {/* Campo de busca */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-1">Buscar Usuários</h3>
        <p className="text-gray-500 mb-4 text-sm">
          Encontre usuários por nome, email ou CPF.
        </p>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar usuários..."
            className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          Usuários ({filtrados.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-xs uppercase">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">CPF</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{u.nome}</td>
                  <td className="py-3 px-4 text-sm">{u.email}</td>
                  <td className="py-3 px-4 text-sm">{u.cpf}</td>
                  <td className="py-3 px-4 text-sm">{u.telefone}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => editarUsuario(u)}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => excluirUsuario(u)}
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

      {/* Modal de Criação/Edição */}
      <Modal
        open={modalAberto}
        title={idEdicao ? "Editar Usuário" : "Novo Usuário"}
        onClose={() => setModalAberto(false)}
      >
        <form onSubmit={salvarUsuario} className="space-y-4">
          {["nome", "email", "cpf", "telefone", "password"].map((campo) => (
            <div key={campo}>
              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                {campo}
              </label>
              <input
                type={campo === "password" ? "password" : "text"}
                value={form[campo] || ""}
                onChange={(e) =>
                  setForm({ ...form, [campo]: e.target.value })
                }
                required={campo !== "telefone"}
                className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

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
