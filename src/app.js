const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

// Importar conexión DB
require("./config/db");

const app = express();

// Configuración
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use(require("./routes/index.routes"));
// AUTH ROUTES
app.use("/api/auth", require("./routes/auth.routes"));

// Iniciar servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en puerto ${app.get("port")}`);
});
