const db = require('../config/db');

class DashboardController {
  static obtenerEstadisticas(req, res) {
    const puesto = req.empleado.puesto;
    
    // Queries base
    const queries = {
      totalPacientes: 'SELECT COUNT(*) as total FROM pacientes',
      cirugiasHoy: `SELECT COUNT(*) as total FROM cirujias 
                    WHERE DATE(fecha_inicio) = CURDATE() AND estado != 'cancelada'`,
      cirugiasPendientes: `SELECT COUNT(*) as total FROM cirujias 
                          WHERE estado = 'programada' AND fecha_inicio > NOW()`,
      proximasCirugias: `SELECT c.*, p.nombre, p.paterno, p.materno, 
                         q.nombre as quirofano, e.nombre_equipo, tc.nombre as tipo_nombre
                         FROM cirujias c
                         LEFT JOIN pacientes p ON c.id_paciente = p.id_paciente
                         LEFT JOIN quirofanos q ON c.id_quirofano = q.id_quirofano
                         LEFT JOIN equipos e ON c.id_equipo = e.id_equipo
                         LEFT JOIN tipo_cirujia tc ON c.id_tipo_cirujia = tc.id_tipo_cirujia
                         WHERE c.estado = 'programada' 
                         AND c.fecha_inicio > NOW()
                         ORDER BY c.fecha_inicio ASC
                         LIMIT 5`
    };

    // Agregar queries específicas según el rol
    if (puesto === 'admin') {
      queries.totalEmpleados = 'SELECT COUNT(*) as total FROM empleados WHERE activo = 1';
      queries.itemsBajoStock = 'SELECT COUNT(*) as total FROM inventario WHERE cantidad < 10';
    }

    if (puesto === 'enfermero') {
      queries.itemsBajoStock = 'SELECT COUNT(*) as total FROM inventario WHERE cantidad < 10';
    }

    const estadisticas = {};
    let completadas = 0;
    const totalQueries = Object.keys(queries).length;

    Object.entries(queries).forEach(([key, query]) => {
      db.query(query, (err, results) => {
        if (err) {
          console.error(`Error en query ${key}:`, err);
          estadisticas[key] = key === 'proximasCirugias' ? [] : 0;
        } else {
          if (key === 'proximasCirugias') {
            estadisticas[key] = results;
          } else {
            estadisticas[key] = results[0].total;
          }
        }

        completadas++;
        if (completadas === totalQueries) {
          // Agregar información del rol
          estadisticas.rolEmpleado = puesto;
          estadisticas.nombreEmpleado = `${req.empleado.nombre} ${req.empleado.paterno}`;
          res.json(estadisticas);
        }
      });
    });
  }

  static obtenerCirugiasPorEstado(req, res) {
    const query = `
      SELECT estado, COUNT(*) as cantidad
      FROM cirujias
      WHERE MONTH(fecha_inicio) = MONTH(CURDATE())
      AND YEAR(fecha_inicio) = YEAR(CURDATE())
      GROUP BY estado
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener cirugías por estado:', err);
        return res.status(500).json({ error: 'Error al obtener datos' });
      }
      res.json(results);
    });
  }

  static obtenerEmpleadosPorPuesto(req, res) {
    // Solo admin puede ver esta información
    if (req.empleado.puesto !== 'admin') {
      return res.status(403).json({ 
        error: 'Acceso denegado',
        message: 'Solo los administradores pueden ver estadísticas de empleados'
      });
    }

    const query = `
      SELECT puesto, COUNT(*) as cantidad
      FROM empleados
      WHERE activo = 1
      GROUP BY puesto
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener empleados por puesto:', err);
        return res.status(500).json({ error: 'Error al obtener datos' });
      }
      res.json(results);
    });
  }

  static obtenerInventarioCritico(req, res) {
    // Solo admin y enfermero pueden ver inventario
    if (req.empleado.puesto === 'doctor') {
      return res.status(403).json({ 
        error: 'Acceso denegado',
        message: 'No tienes permisos para ver el inventario'
      });
    }

    const query = `
      SELECT * FROM inventario
      WHERE cantidad < 10
      ORDER BY cantidad ASC
      LIMIT 10
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener inventario crítico:', err);
        return res.status(500).json({ error: 'Error al obtener datos' });
      }
      res.json(results);
    });
  }
}

module.exports = DashboardController;