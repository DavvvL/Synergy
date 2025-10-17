const express = require('express');
const router = express.Router();
const CirugiaController = require('../controllers/cirugiaController');
const { verificarAuth, verificarPermiso } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(verificarAuth);

// Todas las rutas requieren permiso de 'cirugias'
// Disponible para: admin, doctor, enfermero
router.use(verificarPermiso('cirugias'));

// Rutas de opciones
router.get('/opciones/tipos', CirugiaController.obtenerTipos);
router.get('/opciones/quirofanos', CirugiaController.obtenerQuirofanos);

// CRUD de cirugías
router.get('/', CirugiaController.obtenerTodas);
router.get('/:id', CirugiaController.obtenerPorId);
router.post('/', CirugiaController.crear);
router.put('/:id', CirugiaController.actualizar);
router.delete('/:id', CirugiaController.eliminar);

module.exports = router;