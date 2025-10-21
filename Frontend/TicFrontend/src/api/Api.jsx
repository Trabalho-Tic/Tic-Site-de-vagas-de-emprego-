async function useApi({ endpoint, method = "GET", body = null }) {
  const API_BASE = "http://localhost:8000";

 
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), 
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);

    console.log(`[useApi] ${method} ${API_BASE}${endpoint}`);
    console.log("→ Headers enviados:", options.headers);
    if (body) console.log("→ Body enviado:", body);

    if (!response.ok) {
      // Lê a resposta do servidor (pode ser texto ou JSON)
      const text = await response.text();
      console.error("[useApi] ❌ Status:", response.status);
      console.error("[useApi] ❌ Resposta do servidor:", text);

      // Tenta interpretar como JSON pra extrair a mensagem de erro
      let errorMessage = "";
      try {
        const parsed = JSON.parse(text);
        errorMessage = parsed.error || parsed.message || text;
      } catch {
        errorMessage = text;
      }

      throw new Error(`Erro HTTP ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("[useApi] ✅ Resposta recebida:", data);
    return data;
  } catch (error) {
    console.error("[useApi] ⚠️ Erro ao buscar API:", error.message);
    throw error;
  }
}

export default useApi;
