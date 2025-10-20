const db = require('../config/db');

class DashboardController {
  static obtenerEstadisticas(req, res) {
    const puesto = req.empleado.puesto.toLowerCase();
    
    // Queries base adaptadas a PostgreSQL
    const queries = {
      totalPacientes: 'SELECT COUNT(*) as total FROM pacientes',
      cirugiasHoy: `SELECT COUNT(*) as total FROM cirugias 
                    WHERE DATE(fecha_inicio) = CURRENT_DATE AND estado != 'Cancelada'`,
      cirugiasPendientes: `SELECT COUNT(*) as total FROM cirugias 
                           WHERE estado = 'Programada' AND fecha_inicio > NOW()`,
      
      // ==================================================================
      // ESTA ES LA CONSULTA CLAVE PARA LAS 5 PRÓXIMAS CIRUGÍAS
      // ==================================================================
      proximasCirugias: `
        SELECT 
          c.*, 
          p.nombre, 
          p.paterno, 
          p.materno, 
          q.nombre as quirofano, 
          e.nombre_equipo, 
          tc.nombre as tipo_nombre
        FROM cirugias c
        LEFT JOIN pacientes p ON c.id_paciente = p.id_paciente
        LEFT JOIN quirofanos q ON c.id_quirofano = q.id_quirofano
        LEFT JOIN equipos e ON c.id_equipo = e.id_equipo
        LEFT JOIN tipo_cirugia tc ON c.id_tipo_cirugia = tc.id_tipo_cirugia
        WHERE c.estado = 'Programada' 
          AND c.fecha_inicio > NOW() -- Solo cirugías en el futuro
        ORDER BY c.fecha_inicio ASC -- Ordena por la más próxima primero
        LIMIT 5 -- Limita el resultado a 5
      `
    };

    // Agregar queries específicas según el rol
    if (puesto === 'admin') {
      queries.totalEmpleados = 'SELECT COUNT(*) as total FROM empleados WHERE activo = true';
      queries.itemsBajoStock = 'SELECT COUNT(*) as total FROM inventario WHERE cantidad < cantidad_minima';
    }

    if (puesto === 'enfermero/a') {
      queries.itemsBajoStock = 'SELECT COUNT(*) as total FROM inventario WHERE cantidad < cantidad_minima';
    }

    const estadisticas = {};
    let completadas = 0;
    const totalQueries = Object.keys(queries).length;

    Object.entries(queries).forEach(([key, query]) => {
      db.query(query, (err, results) => {
        if (err) {
          console.error(`Error en query ${key}:`, err);
          estadisticas[key] = key === 'proximasCirugias' ? [] : { total: 0 };
        } else {
          if (key === 'proximasCirugias') {
            estadisticas[key] = results.rows;
          } else {
            estadisticas[key] = results.rows[0].total;
          }
        }

        completadas++;
        if (completadas === totalQueries) {
          estadisticas.rolEmpleado = puesto;
          estadisticas.nombreEmpleado = `${req.empleado.nombre} ${req.empleado.paterno}`;
          res.json(estadisticas);
        }
      });
    });
  }

  static obtenerCirugiasPorEstado(req, res) {
    // Se usa DATE_TRUNC para obtener el mes actual
    const query = `
      SELECT estado, COUNT(*) as cantidad
      FROM cirugias
      WHERE DATE_TRUNC('month', fecha_inicio) = DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY estado
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener cirugías por estado:', err);
        return res.status(500).json({ error: 'Error al obtener datos' });
      }
      res.json(results.rows);
    });
  }

  static obtenerEmpleadosPorPuesto(req, res) {
    if (req.empleado.puesto.toLowerCase() !== 'admin') {
      return res.status(403).json({ 
        error: 'Acceso denegado',
        message: 'Solo los administradores pueden ver estadísticas de empleados'
      });
    }

    const query = `
      SELECT puesto, COUNT(*) as cantidad
      FROM empleados
      WHERE activo = true
      GROUP BY puesto
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener empleados por puesto:', err);
        return res.status(500).json({ error: 'Error al obtener datos' });
      }
      res.json(results.rows);
    });
  }

  static obtenerInventarioCritico(req, res) {
    const puesto = req.empleado.puesto.toLowerCase();
    if (puesto === 'doctor') {
      return res.status(403).json({ 
        error: 'Acceso denegado',
        message: 'No tienes permisos para ver el inventario'
      });
    }

    const query = `
      SELECT i.*, c.nombre as nombre_catalogo, c.descripcion 
      FROM inventario i
      JOIN catalogo c ON i.id_catalogo = c.id_catalogo
      WHERE i.cantidad < i.cantidad_minima
      ORDER BY i.cantidad ASC
      LIMIT 10
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener inventario crítico:', err);
        return res.status(500).json({ error: 'Error al obtener datos' });
      }
      res.json(results.rows);
    });
  }
}

module.exports = DashboardController;