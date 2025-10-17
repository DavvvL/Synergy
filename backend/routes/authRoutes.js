const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Rutas públicas (sin autenticación)
router.post('/login', AuthController.login);
router.post('/verificar-sesion', AuthController.verificarSesion);
router.get('/permisos', AuthController.obtenerPermisos);

// Rutas protegidas
router.post('/cambiar-contraseña', AuthController.cambiarContraseña);

module.exports = router;