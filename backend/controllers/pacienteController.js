const PacienteModel = require('../models/pacienteModel');

class PacienteController {
  static obtenerTodos(req, res) {
    PacienteModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener pacientes:', err);
        return res.status(500).json({ error: 'Error al obtener pacientes' });
      }
      res.json(results.rows);
    });
  }

  static obtenerPorId(req, res) {
    const id = req.params.id;
    PacienteModel.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener paciente:', err);
        return res.status(500).json({ error: 'Error al obtener paciente' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      res.json(results.rows[0]);
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
      // **CAMBIO CLAVE**: Obtener el ID desde result.rows[0].id_paciente
      const nuevoId = result.rows[0].id_paciente;
      res.status(201).json({ id: nuevoId, ...nuevoPaciente });
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