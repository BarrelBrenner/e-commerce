require('dotenv').config();

const Sequelize = require('sequelize');

let sequelize;

if (process.env.ecommerce_db) {
  sequelize = new Sequelize(process.env.ecommerce_db);

} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;