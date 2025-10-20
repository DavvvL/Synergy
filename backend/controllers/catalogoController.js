// controllers/catalogoController.js
const CatalogoModel = require('../models/catalogoModel');

class CatalogoController {
  static obtenerTodos(req, res) {
    CatalogoModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener el catálogo:', err);
        return res.status(500).json({ error: 'Error al obtener el catálogo' });
      }
      res.json(results.rows);
    });
  }
}

module.exports = CatalogoController;