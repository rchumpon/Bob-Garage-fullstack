const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",

    // Explicitly provide the MySQL driver
    dialectModule: mysql2,

    // Aiven MySQL SSL configuration
    dialectOptions: {
      ssl: {
        ca: process.env.DB_CA_CERT?.replace(/\\n/g, "\n"),
        rejectUnauthorized: true,
      },
    },
  },
);

module.exports = sequelize;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   },
// );
// module.exports = sequelize;
