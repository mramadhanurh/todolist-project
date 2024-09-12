const { Sequelize } = require("sequelize");
require("dotenv").config(); // Mengambil variabel dari .env

// Membuat instance Sequelize untuk koneksi ke database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Dialek untuk MySQL
  logging: false,   // Menonaktifkan logging query SQL
});

module.exports = sequelize;