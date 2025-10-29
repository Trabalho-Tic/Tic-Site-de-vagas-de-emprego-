import React, { useState, useEffect } from "react";
import useApi from "../../api/Api";
import Modal from "../../components/Modal";
import DataTable from "../../components/DataTable"; // Tabela para exibição dos dados

export default function CrudEmpresasPage() {
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    password: "",
    url: "",
    categoria: "",
    pais: "",
    cidade: "",
    sobre: "",
    file: null,
  });
  const [idEdicao, setIdEdicao] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState(""); // Feedback do sistema

  // Função para carregar empresas
  async function carregarEmpresas() {
    try {
      const data = await useApi({ endpoint: "/company" });
      setEmpresas(data);
    } catch (err) {
      setMensagem("❌ Erro ao carregar empresas.");
    }
  }

  useEffect(() => {
    carregarEmpresas();
  }, []);

  // Função para editar a empresa
  function editarEmpresa(empresa) {
    setForm(empresa);
    setIdEdicao(empresa.id);
    setModalAberto(true);
  }

  // Função para criar uma nova empresa
  function novaEmpresa() {
    setForm({
      nome: "",
      cnpj: "",
      email: "",
      password: "",
      url: "",
      categoria: "",
      pais: "",
      cidade: "",
      sobre: "",
      file: null,
    });
    setIdEdicao(null);
    setModalAberto(true);
  }

  // Função para excluir empresa
  async function excluirEmpresa(empresa) {
    if (!confirm(`Excluir ${empresa.nome}?`)) return;
    try {
      await useApi({ endpoint: `/company/delete/${empresa.id}`, method: "DELETE" });
      carregarEmpresas();
      setMensagem("✅ Empresa excluída com sucesso.");
    } catch {
      setMensagem("❌ Erro ao excluir empresa.");
    }
  }

  // Função para salvar nova empresa ou atualizar existente
  async function salvarEmpresa(e) {
    e.preventDefault();
    try {
      if (idEdicao) {
        await useApi({
          endpoint: `/company/update/${idEdicao}`,
          method: "PUT",
          body: form,
        });
        setMensagem("✅ Empresa atualizada com sucesso!");
      } else {
        const formData = new FormData();
        for (let key in form) {
          formData.append(key, form[key]);
        }
        await useApi({
          endpoint: "/company/create",
          method: "POST",
          body: formData,
          isFormData: true,
        });
        setMensagem("✅ Empresa criada com sucesso!");
      }
      setModalAberto(false);
      carregarEmpresas();
    } catch (err) {
      setMensagem(`❌ ${err.message || "Erro ao salvar empresa."}`);
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
          <h2 className="text-2xl font-bold">Gerenciamento de Empresas</h2>
          <p className="text-gray-600 text-sm">
            Adicione, edite ou remova empresas do sistema.
          </p>
        </div>
        <button
          onClick={novaEmpresa}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-500"
        >
          Novo Empresa
        </button>
      </div>

      {/* Tabela de Empresas */}
      <DataTable
        columns={[
          { header: "Nome", key: "nome" },
          { header: "CNPJ", key: "cnpj" },
          { header: "Categoria", key: "category" },
          { header: "Email", key: "email" },
        ]}
        data={empresas}
        onEdit={editarEmpresa}
        onDelete={excluirEmpresa}
      />

      {/* Modal de Criação/Edição */}
      <Modal open={modalAberto} title={idEdicao ? "Editar Empresa" : "Nova Empresa"} onClose={() => setModalAberto(false)}>
        <form onSubmit={salvarEmpresa} className="space-y-4">
          {["nome", "cnpj", "email", "password", "url", "categoria", "pais", "cidade", "sobre"].map((campo) => (
            <div key={campo}>
              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{campo}</label>
              <input
                type={campo === "password" ? "password" : "text"}
                value={form[campo] || ""}
                onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
                required
                className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          {/* Upload de Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Logo</label>
            <input
              type="file"
              onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
              className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalAberto(false)} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
