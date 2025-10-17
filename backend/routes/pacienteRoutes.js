const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/pacienteController');
const { verificarAuth, verificarPermiso } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(verificarAuth);

// Todas las rutas requieren permiso de 'pacientes'
// Disponible para: admin, doctor, enfermero
router.use(verificarPermiso('pacientes'));

router.get('/', PacienteController.obtenerTodos);
router.get('/:id', PacienteController.obtenerPorId);
router.post('/', PacienteController.crear);
router.put('/:id', PacienteController.actualizar);
router.delete('/:id', PacienteController.eliminar);

module.exports = router;