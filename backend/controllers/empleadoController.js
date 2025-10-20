const EmpleadoModel = require('../models/empleadoModel');

class EmpleadoController {
  static obtenerTodos(req, res) {
    EmpleadoModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener empleados:', err);
        return res.status(500).json({ error: 'Error al obtener empleados' });
      }
      res.json(results.rows);
    });
  }

  static obtenerPorId(req, res) {
    const id = req.params.id;
    EmpleadoModel.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener empleado:', err);
        return res.status(500).json({ error: 'Error al obtener empleado' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.json(results.rows[0]);
    });
  }

  static crear(req, res) {
    const nuevoEmpleado = req.body;
    console.log('📩 Creando empleado:', nuevoEmpleado);

    EmpleadoModel.create(nuevoEmpleado, (err, result) => {
      if (err) {
        console.error('❌ Error al crear empleado:', err.message);
        return res.status(500).json({ error: 'Error al crear empleado' });
      }
      // **CAMBIO CLAVE**: Obtener el ID desde result.rows[0].id_empleado
      const nuevoId = result.rows[0].id_empleado;
      res.status(201).json({ id: nuevoId, ...nuevoEmpleado });
    });
  }

  static actualizar(req, res) {
    const id = req.params.id;
    const datos = req.body;

    EmpleadoModel.update(id, datos, (err) => {
      if (err) {
        console.error('Error al actualizar empleado:', err);
        return res.status(500).json({ error: 'Error al actualizar empleado' });
      }
      res.json({ id, ...datos });
    });
  }

  static eliminar(req, res) {
    const id = req.params.id;

    EmpleadoModel.delete(id, (err) => {
      if (err) {
        console.error('Error al eliminar empleado:', err);
        return res.status(500).json({ error: 'Error al eliminar empleado' });
      }
      res.json({ success: true, message: 'Empleado eliminado correctamente' });
    });
  }

  static obtenerPuestos(req, res) {
    EmpleadoModel.getPuestos((err, results) => {
      if (err) {
        console.error('Error al obtener puestos:', err);
        return res.status(500).json({ error: 'Error al obtener puestos' });
      }
      res.json(results.rows);
    });
  }

  static obtenerEquipos(req, res) {
    EmpleadoModel.getEquipos((err, results) => {
      if (err) {
        console.error('Error al obtener equipos:', err);
        return res.status(500).json({ error: 'Error al obtener equipos' });
      }
      res.json(results.rows);
    });
  }
}

module.exports = EmpleadoController;