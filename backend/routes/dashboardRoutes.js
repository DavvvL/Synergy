const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const { verificarAuth, verificarPermiso } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(verificarAuth);

// Todas las rutas requieren permiso de 'dashboard'
// Disponible para: admin, doctor, enfermero (todos)
router.use(verificarPermiso('dashboard'));

router.get('/estadisticas', DashboardController.obtenerEstadisticas);
router.get('/cirugias-estado', DashboardController.obtenerCirugiasPorEstado);
router.get('/empleados-puesto', DashboardController.obtenerEmpleadosPorPuesto);
router.get('/inventario-critico', DashboardController.obtenerInventarioCritico);

module.exports = router;