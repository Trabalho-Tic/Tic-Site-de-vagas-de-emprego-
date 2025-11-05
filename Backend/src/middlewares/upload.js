const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Função que retorna um middleware de upload dinâmico.
 * @param {string} folder - subpasta dentro de /uploads (ex: 'fotos', 'curriculos', 'logos')
 */
function createUploader(folder = "geral") {
  const uploadDir = path.join(__dirname, "../../uploads", folder);

  // cria diretório se não existir
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadDir),
    filename: (_, file, cb) => {
      const sanitized = file.originalname.replace(/\s+/g, "_");
      cb(null, Date.now() + "-" + sanitized);
    },
  });

  const fileFilter = (_, file, cb) => {
    const allowedExtensions = /pdf|doc|docx|png|jpg|jpeg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido. Envie PDF, DOC, DOCX, PNG, JPG ou JPEG."));
    }
  };

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
  });
}

module.exports = createUploader;
