const bcrypt = require("bcrypt")

async function gerarHash(senha) {
    const saltRounds = 5;
    const hash = await bcrypt.hash(senha, saltRounds)
    return hash;
}

module.exports = gerarHash