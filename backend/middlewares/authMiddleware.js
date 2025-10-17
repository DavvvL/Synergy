const db = require('../config/db');

// Definición de permisos por rol
const PERMISOS = {
  admin: ['dashboard', 'empleados', 'inventario', 'pacientes', 'cirugias'],
  doctor: ['dashboard', 'pacientes', 'cirugias'],
  enfermero: ['dashboard', 'pacientes', 'cirugias', 'inventario']
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
    'SELECT id_empleado, nombre, paterno, correo, puesto, activo FROM empleados WHERE id_empleado = ?',
    [idEmpleado],
    (err, results) => {
      if (err) {
        console.error('Error al verificar autenticación:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length === 0 || !results[0].activo) {
        return res.status(401).json({ 
          error: 'No autorizado', 
          message: 'Empleado no encontrado o inactivo' 
        });
      }

      // Agregar información del empleado a la request
      req.empleado = results[0];
      next();
    }
  );
};

// Middleware para verificar permisos por rol
const verificarPermiso = (...modulosPermitidos) => {
  return (req, res, next) => {
    const puesto = req.empleado.puesto;
    const permisosEmpleado = PERMISOS[puesto] || [];

    // Verificar si el empleado tiene permiso para alguno de los módulos
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

// Middleware para verificar que solo es admin
const soloAdmin = (req, res, next) => {
  if (req.empleado.puesto !== 'admin') {
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