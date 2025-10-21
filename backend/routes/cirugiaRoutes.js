const express = require('express');
const router = express.Router();
const CirugiaController = require('../controllers/cirugiaController');
// **CAMBIO**: Se importa soloAdmin
const { verificarAuth, verificarPermiso, soloAdmin } = require('../middlewares/authMiddleware');

router.use(verificarAuth);

// --- RUTAS PÚBLICAS PARA CIRUGÍAS (Roles Permitidos) ---
router.use(verificarPermiso('cirugias'));
router.get('/opciones/tipos', CirugiaController.obtenerTipos);
router.get('/opciones/quirofanos', CirugiaController.obtenerQuirofanos);
router.get('/', CirugiaController.obtenerTodas);
router.get('/:id', CirugiaController.obtenerPorId);
router.post('/', CirugiaController.crear);
router.put('/:id', CirugiaController.actualizar);
router.delete('/:id', CirugiaController.eliminar);

// --- RUTAS DE GESTIÓN DE QUIRÓFANOS (SOLO ADMIN) ---
// **CAMBIO**: Se añaden las nuevas rutas protegidas por soloAdmin
router.post('/quirofanos', soloAdmin, CirugiaController.crearQuirofano);
router.put('/quirofanos/:id', soloAdmin, CirugiaController.actualizarQuirofano);
router.delete('/quirofanos/:id', soloAdmin, CirugiaController.eliminarQuirofano);

module.exports = router;