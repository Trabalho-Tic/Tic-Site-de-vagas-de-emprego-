// Backend/src/controllers/AuthController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES || "2h";

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Informe email e password" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: user.id, email: user.email, typeUser: user.typeUser },
      SECRET,
      { expiresIn: EXPIRES_IN }
    );

    // não devolver hash de senha
    const { password: _, ...safe } = user.toJSON();

    return res.json({ token, user: safe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao autenticar" });
  }
}

module.exports = { login };