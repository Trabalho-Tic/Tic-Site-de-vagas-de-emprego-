async function useApi({ endpoint, method = "GET", body = null }) {
  const API_BASE = "http://localhost:8000";

  // 🔐 Pega o token salvo após o login
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // inclui header só se existir token
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.error || `Erro HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar API:", error);
    throw error;
  }
}

export default useApi;
