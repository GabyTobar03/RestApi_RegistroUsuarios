import fs from "fs";
import path from "path";
import { Router } from "express";
const router = Router();

const notasFile = path.join(process.cwd(), 'data', 'Notas.json');

// Ruta GET para obtener todas las notas
router.get('/notas', (req, res) => {
    const notas = ObtenerTodasLasNotas();
    res.json({ notas });
});

// Ruta para crear una nueva nota
router.post('/notas', (req, res) => {
    const { titulo, contenido } = req.body;
    const notas = ObtenerTodasLasNotas();
    
    const nuevaNota = {
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
    fs.writeFileSync(notasFile, JSON.stringify(notas, null, 2));
}

const NotasRoute = router;
export default NotasRoute;
