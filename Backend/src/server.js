require("dotenv").config(); // carrega variáveis do .env
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("../routes/user");
const authRoutes = require("../routes/auth");

const app = express();
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});