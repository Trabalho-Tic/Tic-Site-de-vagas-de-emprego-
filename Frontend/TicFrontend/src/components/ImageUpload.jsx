import React, { useRef, useState } from "react";

function ImageUpload({ label, onFileSelect, error, className = "" }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const handleClick = () => {
    // ✅ Garante que o clique em qualquer parte do componente abre o seletor
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer select-none"
      onClick={handleClick}
    >
      {preview ? (
        <>
          <img
            src={preview}
            alt="Pré-visualização da logo"
            className={`object-cover rounded-md w-24 h-24 ${className}`}
          />
          {/* Botão “Alterar logo” */}
          <span className="absolute bottom-2 bg-black/70 text-white text-xs py-1 px-3 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-200">
            Alterar logo
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9L9 9m3 3l3-3"
            />
          </svg>
          <span className="text-sm text-gray-400">Clique para enviar a logo</span>
          <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG</span>
        </div>
      )}

      {/* ✅ Input de arquivo (invisível mas funcional) */}
      <input
        ref={fileInputRef}
        id="logoUpload"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default ImageUpload;
