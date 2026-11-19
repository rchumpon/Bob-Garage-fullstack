const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const fs = require("fs");
const path = require("path");

// Load Aiven CA certificate
const ca = fs.readFileSync(
  path.join(__dirname, "../../certificates/ca.pem"),
  "utf8",
);

// Create Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",

    // MySQL driver
    dialectModule: mysql2,

    // Aiven SSL configuration
    dialectOptions: {
      ssl: {
        ca: ca,
        rejectUnauthorized: true,
      },
    },

    logging: false,
  },
);

module.exports = sequelize;
