// Backend/src/controllers/AuthController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES || "2h";

/**
 * POST /auth/login
 */
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

    const { password: _, ...safe } = user.toJSON(); // não expor hash
    return res.json({ token, user: safe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao autenticar" });
  }
}

/**
 * POST /auth/register
 * Cadastra usuário, garantindo:
 * - validação mínima de campos
 * - e-mail único
 * - senha com hash (bcrypt)
 * Retorna o usuário sem o campo password.
 * (Se quiser, dá pra também já logar e retornar token aqui.)
 */
async function register(req, res) {
  try {
    const { nome, email, cpf, telefone, typeUser, password } = req.body;

    // validação mínima
    if (!nome || !email || !cpf || !telefone || !typeUser || !password) {
      return res.status(400).json({
        error:
          "Campos obrigatórios: nome, email, cpf, telefone, typeUser, password",
      });
    }

    // checar e-mail único
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Já existe um usuário com esse email" });
    }

    // gerar hash seguro
    const hash = await bcrypt.hash(password, 10);

    // criar usuário
    const user = await User.create({
      nome,
      email,
      cpf,
      telefone,
      typeUser,
      password: hash,
    });

    // responder sem o hash
    const { password: _, ...safe } = user.toJSON();
    return res.status(201).json(safe);

    // (Opcional) Se quiser já autenticar ao registrar:
    // const token = jwt.sign({ id: user.id, email: user.email, typeUser: user.typeUser }, SECRET, { expiresIn: EXPIRES_IN });
    // return res.status(201).json({ token, user: safe });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

module.exports = { login, register };
