const CirugiaModel = require('../models/cirugiaModel');

class CirugiaController {
  static obtenerTodas(req, res) {
    CirugiaModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener cirugías:', err);
        return res.status(500).json({ error: 'Error al obtener cirugías' });
      }
      res.json(results);
    });
  }

  static obtenerPorId(req, res) {
    const id = req.params.id;
    CirugiaModel.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener cirugía:', err);
        return res.status(500).json({ error: 'Error al obtener cirugía' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Cirugía no encontrada' });
      }
      res.json(results[0]);
    });
  }

  static crear(req, res) {
    const nuevaCirugia = req.body;
    nuevaCirugia.creado = new Date();
    nuevaCirugia.actualizado = new Date();

    CirugiaModel.create(nuevaCirugia, (err, result) => {
      if (err) {
        console.error('Error al crear cirugía:', err);
        return res.status(500).json({ error: 'Error al crear cirugía' });
      }
      res.status(201).json({ id: result.insertId, ...nuevaCirugia });
    });
  }

  static actualizar(req, res) {
    const id = req.params.id;
    const datos = req.body;
    datos.actualizado = new Date();

    CirugiaModel.update(id, datos, (err) => {
      if (err) {
        console.error('Error al actualizar cirugía:', err);
        return res.status(500).json({ error: 'Error al actualizar cirugía' });
      }
      res.json({ id, ...datos });
    });
  }

  static eliminar(req, res) {
    const id = req.params.id;

    CirugiaModel.delete(id, (err) => {
      if (err) {
        console.error('Error al eliminar cirugía:', err);
        return res.status(500).json({ error: 'Error al eliminar cirugía' });
      }
      res.json({ success: true, message: 'Cirugía eliminada correctamente' });
    });
  }

  static obtenerTipos(req, res) {
    CirugiaModel.getTipos((err, results) => {
      if (err) {
        console.error('Error al obtener tipos de cirugía:', err);
        return res.status(500).json({ error: 'Error al obtener tipos de cirugía' });
      }
      res.json(results);
    });
  }

  static obtenerQuirofanos(req, res) {
    CirugiaModel.getQuirofanos((err, results) => {
      if (err) {
        console.error('Error al obtener quirófanos:', err);
        return res.status(500).json({ error: 'Error al obtener quirófanos' });
      }
      res.json(results);
    });
  }
}

module.exports = CirugiaController;