async function useApi({ endpoint, method = "GET", body = null }) {
    const API_BASE = "http://localhost:8000";
  
    const token = localStorage.getItem("token");
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, options);
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.log("Erro ao buscar api: ", error);
      throw error;
    }
  }
  
  export default useApi;
  