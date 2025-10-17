const express = require('express');
const router = express.Router();
const InventarioController = require('../controllers/inventarioController');
const { verificarAuth, verificarPermiso } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(verificarAuth);

// Todas las rutas requieren permiso de 'inventario'
// Disponible para: admin, enfermero
router.use(verificarPermiso('inventario'));

router.get('/', InventarioController.obtenerTodo);
router.get('/:id', InventarioController.obtenerPorId);
router.post('/', InventarioController.crear);
router.put('/:id', InventarioController.actualizar);
router.patch('/:id/cantidad', InventarioController.actualizarCantidad);
router.delete('/:id', InventarioController.eliminar);

module.exports = router;