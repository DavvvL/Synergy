const db = require('../config/db');

// Permisos por rol
const PERMISOS_ROL = {
  admin: {
    modulos: ['dashboard', 'empleados', 'inventario', 'pacientes', 'cirugias'],
    descripcion: 'Acceso completo al sistema'
  },
  doctor: {
    modulos: ['dashboard', 'pacientes', 'cirugias'],
    descripcion: 'Gestión de pacientes y cirugías'
  },
  enfermero: {
    modulos: ['dashboard', 'pacientes', 'cirugias', 'inventario'],
    descripcion: 'Gestión de pacientes, cirugías e inventario'
  }
};

class AuthController {
  static login(req, res) {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ 
        error: 'Datos incompletos',
        message: 'Correo y contraseña son requeridos' 
      });
    }

    const query = `
      SELECT e.*, eq.nombre_equipo 
      FROM empleados e
      LEFT JOIN equipos eq ON e.id_equipo = eq.id_equipo
      WHERE e.correo = ? AND e.contraseña = ? AND e.activo = 1
    `;
    
    db.query(query, [correo, contraseña], (err, results) => {
      if (err) {
        console.error('Error en login:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length === 0) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas',
          message: 'Correo o contraseña incorrectos, o usuario inactivo'
        });
      }

      const empleado = results[0];
      const puesto = empleado.puesto;
      
      // Eliminar la contraseña de la respuesta
      delete empleado.contraseña;

      // Obtener permisos del rol
      const permisos = PERMISOS_ROL[puesto] || { modulos: [], descripcion: 'Sin permisos' };

      res.json({
        success: true,
        message: 'Login exitoso',
        empleado: {
          id_empleado: empleado.id_empleado,
          nombre: empleado.nombre,
          paterno: empleado.paterno,
          materno: empleado.materno,
          correo: empleado.correo,
          puesto: empleado.puesto,
          turno: empleado.turno,
          telefono: empleado.telefono,
          id_equipo: empleado.id_equipo,
          nombre_equipo: empleado.nombre_equipo,
          activo: empleado.activo
        },
        permisos: permisos.modulos,
        descripcionRol: permisos.descripcion
      });
    });
  }

  static verificarSesion(req, res) {
    const { id_empleado } = req.body;

    if (!id_empleado) {
      return res.status(400).json({ 
        error: 'Datos incompletos',
        message: 'ID de empleado requerido' 
      });
    }

    const query = `
      SELECT e.*, eq.nombre_equipo 
      FROM empleados e
      LEFT JOIN equipos eq ON e.id_equipo = eq.id_equipo
      WHERE e.id_empleado = ? AND e.activo = 1
    `;

    db.query(query, [id_empleado], (err, results) => {
      if (err) {
        console.error('Error al verificar sesión:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ 
          error: 'Sesión inválida',
          message: 'Empleado no encontrado o inactivo'
        });
      }

      const empleado = results[0];
      const puesto = empleado.puesto;
      delete empleado.contraseña;

      // Obtener permisos del rol
      const permisos = PERMISOS_ROL[puesto] || { modulos: [], descripcion: 'Sin permisos' };

      res.json({
        success: true,
        empleado: {
          id_empleado: empleado.id_empleado,
          nombre: empleado.nombre,
          paterno: empleado.paterno,
          materno: empleado.materno,
          correo: empleado.correo,
          puesto: empleado.puesto,
          turno: empleado.turno,
          telefono: empleado.telefono,
          id_equipo: empleado.id_equipo,
          nombre_equipo: empleado.nombre_equipo,
          activo: empleado.activo
        },
        permisos: permisos.modulos,
        descripcionRol: permisos.descripcion
      });
    });
  }

  static obtenerPermisos(req, res) {
    res.json({
      roles: PERMISOS_ROL
    });
  }

  static cambiarContraseña(req, res) {
    const { id_empleado, contraseña_actual, contraseña_nueva } = req.body;

    if (!id_empleado || !contraseña_actual || !contraseña_nueva) {
      return res.status(400).json({ 
        error: 'Datos incompletos',
        message: 'Se requieren todos los campos' 
      });
    }

    // Verificar contraseña actual
    db.query(
      'SELECT * FROM empleados WHERE id_empleado = ? AND contraseña = ?',
      [id_empleado, contraseña_actual],
      (err, results) => {
        if (err) {
          console.error('Error al verificar contraseña:', err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
          return res.status(401).json({ 
            error: 'Contraseña incorrecta',
            message: 'La contraseña actual no es correcta'
          });
        }

        // Actualizar contraseña
        db.query(
          'UPDATE empleados SET contraseña = ? WHERE id_empleado = ?',
          [contraseña_nueva, id_empleado],
          (err) => {
            if (err) {
              console.error('Error al cambiar contraseña:', err);
              return res.status(500).json({ error: 'Error al cambiar contraseña' });
            }

            res.json({
              success: true,
              message: 'Contraseña actualizada correctamente'
            });
          }
        );
      }
    );
  }
}

module.exports = AuthController;