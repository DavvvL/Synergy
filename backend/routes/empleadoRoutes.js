const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/empleadoController');
const { verificarAuth, verificarPermiso, soloAdmin } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(verificarAuth);

// Rutas de opciones - Accesibles para usuarios autenticados (sin restricción de permisos)
// Cualquiera autenticado puede ver puestos y equipos
router.get('/opciones/puestos', EmpleadoController.obtenerPuestos);
router.get('/opciones/equipos', EmpleadoController.obtenerEquipos);
router.post('/equipos', soloAdmin, EmpleadoController.crearEquipo);
router.put('/equipos/:id', soloAdmin, EmpleadoController.actualizarEquipo);
router.delete('/equipos/:id', soloAdmin, EmpleadoController.eliminarEquipo);

// CRUD de empleados (solo admin)
router.get('/', EmpleadoController.obtenerTodos);
router.get('/:id', soloAdmin, EmpleadoController.obtenerPorId);
router.post('/', soloAdmin, EmpleadoController.crear);
router.put('/:id', soloAdmin, EmpleadoController.actualizar);
router.delete('/:id', soloAdmin, EmpleadoController.eliminar);

module.exports = router;