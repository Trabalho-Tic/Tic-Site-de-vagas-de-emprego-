async function useApi({ endpoint, method = "GET", body = null }) {
    const API_BASE = "http://localhost:8000";
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, options);
  
      if (!response.ok) {
        console.log("Status:", response.status);
        const text = await response.text();
        console.error("Resposta do servidor:", text);
        throw new Error(`Erro HTTP ${response.status}: ${text}`);
      }

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error);
      }
  
      return await response.json();
    } catch (error) {
      console.log("Erro ao buscar api: ", error);
      throw error;
    }
  }
  
  export default useApi;
  