async function useApi({ endpoint, method = "GET", body = null, isFormData = false }) {
  const API_BASE = "http://localhost:8000";
  const token = localStorage.getItem("token");

  const headers = {};

  // 🔧 Só adiciona Content-Type se não for FormData( ou seja upload de imagem)
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  // 🔁 Só faz JSON.stringify se não for FormData
  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);

    console.log(`[useApi] ${method} ${API_BASE}${endpoint}`);
    console.log("→ Headers enviados:", headers);
    if (body && !isFormData) console.log("→ Body enviado:", body);

    if (!response.ok) {
      const text = await response.text();
      console.error("[useApi] ❌ Status:", response.status);
      console.error("[useApi] ❌ Resposta do servidor:", text);

      let errorMessage = "";
      try {
        const parsed = JSON.parse(text);
        errorMessage = parsed.error || parsed.message || text;
      } catch {
        errorMessage = text;
      }

      throw new Error(`Erro HTTP ${response.status}: ${errorMessage}`);
    }

    // 🔍 Se a resposta for JSON válida, retorna
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("[useApi] ✅ Resposta recebida:", data);
      return data;
    }

    // 📦 Caso seja texto ou vazio
    return await response.text();
  } catch (error) {
    console.error("[useApi] ⚠️ Erro ao buscar API:", error.message);
    throw error;
  }
}

export default useApi;
