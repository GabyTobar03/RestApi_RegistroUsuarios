import fs from "fs";
import path from "path";
import { Router } from "express";
const router = Router();

const notasFile = path.join(process.cwd(), 'data', 'Notas.json');
const notas = ObtenerTodasLasNotas();

// Ruta GET para obtener todas las notas
router.post('/obtener', (req, res) => {
    const { userId} = req.body

    // Filtra las notas que tienen el ID de usuario especificado
    const notasRelacionadas = notas.filter(nota => nota.userId === userId);

    return res.json({ notas: notasRelacionadas });
});

// Ruta para crear una nueva nota
router.post('/notas', (req, res) => {
    const { userId,titulo, contenido } = req.body;
    
    const nuevaNota = {
        userId,
        id: notas.length + 1,
        titulo,
        contenido
    };
    notas.push(nuevaNota);

    GuardarTodasLasNotas(notas);

    return res.json({ message: 'Nota creada exitosamente', nota: nuevaNota });
});

// Función para cargar todas las notas desde Notas.json
function ObtenerTodasLasNotas() {
    const contenido = fs.readFileSync(notasFile, 'UTF-8');
    const notas = JSON.parse(contenido);
    return notas;
}

// Función para guardar todas las notas en el archivo JSON
function GuardarTodasLasNotas(notas) {
    fs.writeFileSync(notasFile, JSON.stringify(notas));
}

const NotasRoute = router;
export default NotasRoute;
