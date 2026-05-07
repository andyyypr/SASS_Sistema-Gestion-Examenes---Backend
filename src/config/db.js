const mysql = require("mysql2");

// Cargar variables de entorno
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }

  console.log("Base de datos conectada");
});

module.exports = db;
