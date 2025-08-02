const sequelize = require('./src/config/database')

await sequelize.authenticate();