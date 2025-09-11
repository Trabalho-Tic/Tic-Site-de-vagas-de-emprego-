const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: "Usuário não encontrado" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Senha incorreta" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, typeUser: user.typeUser },
                SECRET,
                { expiresIn: "2h" }
            );

            return res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
        } catch (error) {
            return res.status(500).json({ error: "Erro no login", details: error.message });
        }
    }
}

module.exports = new AuthController();
