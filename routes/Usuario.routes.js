import fs from "fs";
import path from "path";
import { Router } from "express";
const router = Router();

const usuariosFile = path.join(process.cwd(), 'data', 'Usuario.json');

// Ruta GET para obtener la lista de usuarios
router.get('/users', (req, res) => {
    const usuarios = ObtenerUsuarios();
    res.json({ usuarios });
});

// Ruta para autenticar un usuario por nombre de usuario y contraseña
router.post('/login', (req, res) => {
    const { nameUser, password } = req.body;
    const usuarios = ObtenerUsuarios();

    const usuario = usuarios.find(user => user.nameUser === nameUser);

    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuario.password === password) {
        return res.json({ usuario });
    } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
});

// Ruta para crear un nuevo usuario y validar el nombre de usuario
router.post('/create', (req, res) => {
    const { nameUser, password, Nombre, Apellido, Edad } = req.body;
    const usuarios = ObtenerUsuarios();

    // Verificar si el nombre de usuario ya está en uso
    const usuarioExistente = usuarios.find(user => user.nameUser === nameUser);
    if (usuarioExistente) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const nuevoUsuario = {
        nameUser,
        password,
        Nombre,
        Apellido,
        Edad
    };


    usuarios.push(nuevoUsuario);
    fs.writeFileSync(usuariosFile, JSON.stringify(usuarios, null, 2));

    return res.json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
});

function ObtenerUsuarios() {
    const usuariosFile = path.join(process.cwd(), 'data', 'Usuario.json');
    const contenido = fs.readFileSync(usuariosFile, 'UTF-8');
    return JSON.parse(contenido);
}

export default router;
