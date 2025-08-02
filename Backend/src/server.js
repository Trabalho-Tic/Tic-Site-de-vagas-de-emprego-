require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = 8000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`🚀 Server on in: http://localhost:${PORT}`)
  });
});