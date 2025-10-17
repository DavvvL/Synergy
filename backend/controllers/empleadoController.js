const EmpleadoModel = require('../models/empleadoModel');

class EmpleadoController {
  static obtenerTodos(req, res) {
    EmpleadoModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener empleados:', err);
        return res.status(500).json({ error: 'Error al obtener empleados' });
      }
      res.json(results);
    });
  }

  static obtenerPorId(req, res) {
    const id = req.params.id;
    EmpleadoModel.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener empleado:', err);
        return res.status(500).json({ error: 'Error al obtener empleado' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.json(results[0]);
    });
  }

  static crear(req, res) {
    const nuevoEmpleado = req.body;
    console.log('📩 Creando empleado:', nuevoEmpleado);

    EmpleadoModel.create(nuevoEmpleado, (err, result) => {
      if (err) {
        console.error('❌ Error al crear empleado:', err.sqlMessage || err.message);
        return res.status(500).json({ error: 'Error al crear empleado' });
      }
      res.status(201).json({ id: result.insertId, ...nuevoEmpleado });
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
      res.json(results);
    });
  }

  static obtenerEquipos(req, res) {
    EmpleadoModel.getEquipos((err, results) => {
      if (err) {
        console.error('Error al obtener equipos:', err);
        return res.status(500).json({ error: 'Error al obtener equipos' });
      }
      res.json(results);
    });
  }
}

module.exports = EmpleadoController;