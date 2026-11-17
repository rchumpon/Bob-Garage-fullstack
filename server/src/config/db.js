const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DIALECT || "mysql",

    // Enable SSL when connecting to Aiven
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
