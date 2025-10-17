const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/empleadoController');
const { verificarAuth, verificarPermiso, soloAdmin } = require('../middlewares/authMiddleware');

// Todas las rutas de empleados requieren autenticación
router.use(verificarAuth);

// Rutas de opciones (disponibles para admin)
router.get('/opciones/puestos', verificarPermiso('empleados'), EmpleadoController.obtenerPuestos);
router.get('/opciones/equipos', verificarPermiso('empleados'), EmpleadoController.obtenerEquipos);

// CRUD de empleados (solo admin)
router.get('/', soloAdmin, EmpleadoController.obtenerTodos);
router.get('/:id', soloAdmin, EmpleadoController.obtenerPorId);
router.post('/', soloAdmin, EmpleadoController.crear);
router.put('/:id', soloAdmin, EmpleadoController.actualizar);
router.delete('/:id', soloAdmin, EmpleadoController.eliminar);

module.exports = router;