const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Caminho para onde os currículos serão salvos
const uploadDir = path.join(__dirname, "../../uploads/logos");

// Cria o diretório automaticamente se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    // Nome do arquivo = timestamp + nome original sem espaços
    const sanitized = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + sanitized);
  },
});

// Filtro de tipos de arquivo permitidos
const fileFilter = (_, file, cb) => {
  const allowedExtensions = /pdf|doc|docx|png|jpg|jpeg/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido. Envie PDF, DOC, DOCX, PNG, JPG ou JPEG."));
  }
};

// Exporta middleware configurado
module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // até 5MB
  fileFilter,
});
