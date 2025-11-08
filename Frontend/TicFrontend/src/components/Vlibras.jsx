import { useEffect } from "react";
import "../Styles/home.css"

export default function VLibras() {
  useEffect(() => {
    // Evita inicializar o VLibras mais de uma vez
    if (document.getElementById("vlibras-container")) return;

    // Cria o container principal
    const container = document.createElement("div");
    container.id = "vlibras-container";
    container.setAttribute("vw", "");
    container.classList.add("enabled");
    container.innerHTML = `
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    `;
    document.body.appendChild(container);

    // Adiciona o script (somente se ainda não existir)
    if (!document.getElementById("vlibras-script")) {
      const script = document.createElement("script");
      script.id = "vlibras-script";
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.onload = () => {
        if (window.VLibras && !window.vlibrasLoaded) {
          new window.VLibras.Widget("https://vlibras.gov.br/app");
          window.vlibrasLoaded = true; // flag global para evitar nova inicialização
        }
      };
      document.body.appendChild(script);
    }

    // Nenhum cleanup — evita que o React remova o widget ao re-renderizar
  }, []);

  return null;
}
