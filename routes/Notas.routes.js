import fs from "fs";
import path from "path";
import { Router } from "express";
const router = Router();

const notasFile = path.join(process.cwd(), 'data', 'Notas.json');

// Ruta GET para obtener todas las notas de un usuario por su ID
router.get('/notas', (req, res) => {
    const userId = req.params.userId;
    const notas = ObtenerNotasPorUsuario(userId);
    res.json({ notas });
});

// Ruta para crear una nueva nota para un usuario específico
router.post('/notas', (req, res) => {
    const userId = req.params.userId;
    const { titulo, contenido } = req.body;
    const notas = ObtenerNotasPorUsuario(userId);
    
    const nuevaNota = {
        id: notas.length + 1,
        titulo,
        contenido
    };

    notas.push(nuevaNota);

    GuardarNotasPorUsuario(userId, notas);

    return res.json({ message: 'Nota creada exitosamente', nota: nuevaNota });
});

// Función para cargar las notas de un usuario desde Notas.json
function ObtenerNotasPorUsuario(userId) {
    const contenido = fs.readFileSync(notasFile, 'UTF-8');
    const notas = JSON.parse(contenido);
    return notas.filter(nota => nota.userId === userId);
}

// Función para guardar las notas de un usuario en el archivo JSON
function GuardarNotasPorUsuario(userId, notas) {
    const contenido = fs.readFileSync(notasFile, 'UTF-8');
    const todasLasNotas = JSON.parse(contenido);
    const notasDelUsuario = todasLasNotas.filter(nota => nota.userId !== userId);
    notasDelUsuario.push(...notas);
    fs.writeFileSync(notasFile, JSON.stringify(notasDelUsuario, null, 2));
}

const NotasRoute = router;
export default NotasRoute;