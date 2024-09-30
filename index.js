const { parse } = require("dotenv");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConection } = require("./database/config");

//crear el servidor de express

const app = express();
//base de datos
dbConection();
//cors
app.use(cors())
//directorio publico
app.use(express.static("public"));
// lectura y parseo del body
app.use(express.json());
//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//TODO: CRUD :eventos

// esuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
