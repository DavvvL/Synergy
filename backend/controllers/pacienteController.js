const PacienteModel = require('../models/pacienteModel');

class PacienteController {
  static obtenerTodos(req, res) {
    PacienteModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener pacientes:', err);
        return res.status(500).json({ error: 'Error al obtener pacientes' });
      }
      res.json(results);
    });
  }

  static obtenerPorId(req, res) {
    const id = req.params.id;
    PacienteModel.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener paciente:', err);
        return res.status(500).json({ error: 'Error al obtener paciente' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      res.json(results[0]);
    });
  }

  static crear(req, res) {
    const nuevoPaciente = req.body;
    nuevoPaciente.creado = new Date();

    PacienteModel.create(nuevoPaciente, (err, result) => {
      if (err) {
        console.error('Error al crear paciente:', err);
        return res.status(500).json({ error: 'Error al crear paciente' });
      }
      res.status(201).json({ id: result.insertId, ...nuevoPaciente });
    });
  }

  static actualizar(req, res) {
    const id = req.params.id;
    const datos = req.body;

    PacienteModel.update(id, datos, (err) => {
      if (err) {
        console.error('Error al actualizar paciente:', err);
        return res.status(500).json({ error: 'Error al actualizar paciente' });
      }
      res.json({ id, ...datos });
    });
  }

  static eliminar(req, res) {
    const id = req.params.id;

    PacienteModel.delete(id, (err) => {
      if (err) {
        console.error('Error al eliminar paciente:', err);
        return res.status(500).json({ error: 'Error al eliminar paciente' });
      }
      res.json({ success: true, message: 'Paciente eliminado correctamente' });
    });
  }
}

module.exports = PacienteController;