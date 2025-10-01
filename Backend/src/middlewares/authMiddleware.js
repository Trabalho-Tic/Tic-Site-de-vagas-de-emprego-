const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// Middleware de autenticação
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" "); // Bearer token
    if (!token) {
        return res.status(401).json({ error: "Token inválido" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // Anexa o usuário ao request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}


function adminAuthMiddleware(req, res, next) {
    
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Acesso restrito a administradores" });
    }
    next()
}

module.exports = { authMiddleware, adminAuthMiddleware };