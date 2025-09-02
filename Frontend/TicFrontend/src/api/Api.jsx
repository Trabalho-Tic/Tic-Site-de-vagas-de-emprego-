async function useApi({ endpoint, method = "GET", body = null }) {

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(`http://localhost/${endpoint}`, options)
        
        if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
        }

        return await response.json()
    } catch(error) {
        console.log("Erro ao buscar api: ", error)
        throw error
    }
}

export default useApi