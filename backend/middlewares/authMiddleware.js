const db = require('../config/db');

// Definición de permisos por rol
const PERMISOS = {
  admin: ['dashboard', 'empleados', 'inventario', 'pacientes', 'cirugias'],
  doctor: ['dashboard', 'pacientes', 'cirugias'],
  'enfermero/a': ['dashboard', 'pacientes', 'cirugias', 'inventario'] // <-- CORREGIDO a minúsculas
};

// Middleware para verificar autenticación
const verificarAuth = (req, res, next) => {
  const idEmpleado = req.headers['x-empleado-id'];

  if (!idEmpleado) {
    return res.status(401).json({ 
      error: 'No autorizado', 
      message: 'Debes iniciar sesión' 
    });
  }

  // Verificar que el empleado existe y está activo
  db.query(
    // **CAMBIO**: Se reemplaza ? por $1
    'SELECT id_empleado, nombre, paterno, correo, puesto, activo FROM empleados WHERE id_empleado = $1',
    [idEmpleado],
    (err, results) => {
      if (err) {
        console.error('Error al verificar autenticación:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      // Se usa results.rows y se verifica que el empleado esté activo
      if (results.rows.length === 0 || results.rows[0].activo !== true) {
        return res.status(401).json({ 
          error: 'No autorizado', 
          message: 'Empleado no encontrado o inactivo' 
        });
      }

      // Agregar información del empleado a la request
      req.empleado = results.rows[0];
      next();
    }
  );
};

// Middleware para verificar permisos por rol (sin cambios)
const verificarPermiso = (...modulosPermitidos) => {
  return (req, res, next) => {
    const puesto = req.empleado.puesto.toLowerCase(); 
    const permisosEmpleado = PERMISOS[puesto] || []; 

    const tienePermiso = modulosPermitidos.some(modulo => 
      permisosEmpleado.includes(modulo)
    );

    if (!tienePermiso) {
      return res.status(403).json({ 
        error: 'Acceso denegado',
        message: `No tienes permisos para acceder a este recurso. Tu rol: ${puesto}`,
        permisosRequeridos: modulosPermitidos,
        tusPermisos: permisosEmpleado
      });
    }

    next();
  };
};

// Middleware para verificar que solo es admin (sin cambios)
const soloAdmin = (req, res, next) => {
  if (req.empleado.puesto.toLowerCase() !== 'admin') {
    return res.status(403).json({ 
      error: 'Acceso denegado',
      message: 'Solo los administradores pueden realizar esta acción'
    });
  }
  next();
};

module.exports = {
  verificarAuth,
  verificarPermiso,
  soloAdmin,
  PERMISOS
};