import express from "express";
import dotenv from "dotenv";
import usuarioRoute from "./routes/Usuario.routes.js";
import NotasRoute from "./routes/Notas.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api", usuarioRoute);
app.use("/Nota", NotasRoute);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
