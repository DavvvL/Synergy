// routes/catalogoRoutes.js
const express = require('express');
const router = express.Router();
const CatalogoController = require('../controllers/catalogoController');
const { verificarAuth } = require('../middlewares/authMiddleware');

// Se requiere autenticación para acceder al catálogo
router.use(verificarAuth);

router.get('/', CatalogoController.obtenerTodos);

module.exports = router;