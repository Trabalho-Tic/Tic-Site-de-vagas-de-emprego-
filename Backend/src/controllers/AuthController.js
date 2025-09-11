import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import gerarHash from "../utils/auth"
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET

async function login(request, response) {
    const { email, password } = request.body;
    
    const user = { id: 1, email: "teste@gmail.com", password: "123abc"}

    if (email != user.email) {
        return response.status(401).json({ error: "Usuario não encontrado" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return response.status(401).json({ error: "Senha incorreta" })
    }

    const token = jwt.sign(
        {
            id: user.id, email: user.email
        },
        SECRET,
        { expiresIn: "2h" }
    )

    return response.json({ token })
}