const InventarioModel = require('../models/inventarioModel');

class InventarioController {
  static obtenerTodo(req, res) {
    InventarioModel.getAll((err, results) => {
      if (err) {
        console.error('Error al obtener inventario:', err);
        return res.status(500).json({ error: 'Error al obtener inventario' });
      }
      // El driver pg devuelve los resultados en la propiedad 'rows'
      res.json(results.rows);
    });
  }

  static obtenerPorId(req, res) {
    const id = req.params.id;
    InventarioModel.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener item:', err);
        return res.status(500).json({ error: 'Error al obtener item' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Item no encontrado' });
      }
      res.json(results.rows[0]);
    });
  }

  static crear(req, res) {
    const nuevoItem = req.body;

    InventarioModel.create(nuevoItem, (err, result) => {
      if (err) {
        console.error('Error al crear item:', err);
        return res.status(500).json({ error: 'Error al crear item' });
      }
      // **CAMBIO CLAVE**: Obtener el ID desde result.rows[0].id_inventario
      const nuevoId = result.rows[0].id_inventario;
      res.status(201).json({ id: nuevoId, ...nuevoItem });
    });
  }

  static actualizar(req, res) {
    const id = req.params.id;
    const datos = req.body;

    InventarioModel.update(id, datos, (err) => {
      if (err) {
        console.error('Error al actualizar item:', err);
        return res.status(500).json({ error: 'Error al actualizar item' });
      }
      res.json({ id, ...datos });
    });
  }

  static eliminar(req, res) {
    const id = req.params.id;

    InventarioModel.delete(id, (err) => {
      if (err) {
        console.error('Error al eliminar item:', err);
        return res.status(500).json({ error: 'Error al eliminar item' });
      }
      res.json({ success: true, message: 'Item eliminado correctamente' });
    });
  }

  static actualizarCantidad(req, res) {
    const id = req.params.id;
    const { cantidad } = req.body;

    InventarioModel.updateCantidad(id, cantidad, (err) => {
      if (err) {
        console.error('Error al actualizar cantidad:', err);
        return res.status(500).json({ error: 'Error al actualizar cantidad' });
      }
      res.json({ success: true, id, cantidad });
    });
  }
}

module.exports = InventarioController;