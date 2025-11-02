import React, { useState, useEffect } from "react";
import useApi from "../../api/Api";
import Modal from "../../components/Modal";
import DataTable from "../../components/DataTable";

export default function CrudEmpresasPage() {
  const [empresas, setEmpresas] = useState([]);
  const [busca, setBusca] = useState("");
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
    logo: null,
  });
  const [idEdicao, setIdEdicao] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // 🔄 Buscar empresas
  async function carregarEmpresas() {
    try {
      const data = await useApi({ endpoint: "/company" });
      setEmpresas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar empresas:", err);
      setMensagem("❌ Erro ao carregar empresas.");
    }
  }

  useEffect(() => {
    carregarEmpresas();
  }, []);

  // 🔍 Filtro personalizado
  const filtradas = empresas.filter((e) => {
    const termo = busca.toLowerCase();
    return (
      e.nome?.toLowerCase().includes(termo) ||
      e.cnpj?.toLowerCase().includes(termo) ||
      e.email?.toLowerCase().includes(termo) ||
      e.category?.toLowerCase().includes(termo) ||
      e.cidade?.toLowerCase().includes(termo)
    );
  });

  // ✏️ Editar empresa
  function editarEmpresa(empresa) {
    setForm({
      nome: empresa.nome || "",
      cnpj: empresa.cnpj || "",
      email: empresa.email || "",
      password: "",
      url: empresa.url_site || "",
      categoria: empresa.category || "",
      pais: empresa.pais || "",
      cidade: empresa.cidade || "",
      sobre: empresa.sobre || "",
      logo: null,
    });
    setIdEdicao(empresa.id);
    setModalAberto(true);
  }

  // ➕ Nova empresa
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
      logo: null,
    });
    setIdEdicao(null);
    setModalAberto(true);
  }

  // ❌ Excluir empresa
  async function excluirEmpresa(empresa) {
    if (!confirm(`Excluir ${empresa.nome}?`)) return;
    try {
      await useApi({
        endpoint: `/company/delete/${empresa.id}`,
        method: "DELETE",
      });
      carregarEmpresas();
      setMensagem("✅ Empresa excluída com sucesso.");
    } catch {
      setMensagem("❌ Erro ao excluir empresa.");
    }
  }

  // 💾 Criar ou atualizar empresa
  async function salvarEmpresa(e) {
    e.preventDefault();
    try {
      if (idEdicao) {
        // 🟢 Atualização direta
        await useApi({
          endpoint: `/company/update/${idEdicao}`,
          method: "PUT",
          body: {
            nome: form.nome,
            cnpj: form.cnpj,
            email: form.email,
            url_site: form.url,
            category: form.categoria,
            pais: form.pais,
            cidade: form.cidade,
            sobre: form.sobre,
          },
        });
        setMensagem("✅ Empresa atualizada com sucesso!");
      } else {
        // 🧩 1ª etapa → criar o usuário base
        const user = await useApi({
          endpoint: "/user/create",
          method: "POST",
          body: {
            nome: form.nome,
            email: form.email,
            password: form.password,
            telefone: "00000000000",
            typeUser: "empresa",
          },
        });

        // 🧩 2ª etapa → criar empresa vinculada
        const formData = new FormData();
        formData.append("nome", form.nome);
        formData.append("cnpj", form.cnpj);
        formData.append("url_site", form.url);
        formData.append("email", form.email);
        formData.append("category", form.categoria);
        formData.append("pais", form.pais);
        formData.append("cidade", form.cidade);
        formData.append("sobre", form.sobre);
        formData.append("id_user", user.id);
        if (form.logo) formData.append("logo", form.logo);

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
      console.error("Erro ao salvar empresa:", err);
      setMensagem(`❌ ${err.message || "Erro ao salvar empresa."}`);
    }
  }

  return (
    <div>
      {/* 🧾 Mensagem de feedback */}
      {mensagem && (
        <div className="bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-md mb-4 text-sm">
          {mensagem}
        </div>
      )}

      {/* 🔝 Cabeçalho */}
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
          <span className="material-symbols-outlined">add</span>
          Nova Empresa
        </button>
      </div>

      {/* 🔍 Campo de busca */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-1">Buscar Empresas</h3>
        <p className="text-gray-500 mb-4 text-sm">
          Encontre empresas por nome, CNPJ, categoria, email ou cidade.
        </p>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar empresas..."
            className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 📋 Tabela */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          Empresas ({filtradas.length})
        </h3>
        <DataTable
          columns={[
            { header: "Nome", key: "nome" },
            { header: "CNPJ", key: "cnpj" },
            { header: "Categoria", key: "category" },
            { header: "Email", key: "email" },
            { header: "Cidade", key: "cidade" },
          ]}
          data={filtradas}
          onEdit={editarEmpresa}
          onDelete={excluirEmpresa}
        />
      </div>

      {/* 🧩 Modal */}
      <Modal
        open={modalAberto}
        title={idEdicao ? "Editar Empresa" : "Nova Empresa"}
        onClose={() => setModalAberto(false)}
      >
        <form onSubmit={salvarEmpresa} className="space-y-4">
          {/* Campos de texto */}
          {[
            { label: "Nome", key: "nome" },
            { label: "CNPJ", key: "cnpj" },
            { label: "Email", key: "email" },
            { label: "Senha", key: "password", type: "password" },
            { label: "URL do site", key: "url" },
            { label: "Categoria", key: "categoria" },
            { label: "País", key: "pais" },
            { label: "Cidade", key: "cidade" },
            { label: "Sobre", key: "sobre" },
          ].map((campo) => (
            <div key={campo.key}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {campo.label}
              </label>
              <input
                type={campo.type || "text"}
                value={form[campo.key] || ""}
                onChange={(e) =>
                  setForm({ ...form, [campo.key]: e.target.value })
                }
                required={campo.key !== "url" && campo.key !== "sobre"}
                className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          {/* Upload de logo */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Logo da Empresa
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
              className="w-full bg-gray-100 border-none rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500"
            />
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
