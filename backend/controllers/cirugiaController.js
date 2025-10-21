const CirugiaModel = require('../models/cirugiaModel');

class CirugiaController {
  static obtenerTodas(req, res) {
    // Se obtiene el empleado desde el middleware de autenticación
    const empleado = req.empleado;

    if (empleado && empleado.puesto.toLowerCase() === 'doctor') {
      // Si es un doctor, llama a la nueva función para filtrar por su equipo
      CirugiaModel.getAllByEquipo(empleado.id_equipo, (err, results) => {
        if (err) {
          console.error('Error al obtener cirugías por equipo:', err);
          return res.status(500).json({ error: 'Error al obtener cirugías' });
        }
        res.json(results.rows);
      });
    } else {
      // Para cualquier otro rol (Admin, etc.), obtiene todas las cirugías
      CirugiaModel.getAll((err, results) => {
        if (err) {
          console.error('Error al obtener todas las cirugías:', err);
          return res.status(500).json({ error: 'Error al obtener todas las cirugías' });
        }
        res.json(results.rows);
      });
    }
  }

  static obtenerPorId(req, res) {
    const id = req.params.id;
    CirugiaModel.getById(id, (err, results) => {
      if (err) {
        console.error('Error al obtener cirugía:', err);
        return res.status(500).json({ error: 'Error al obtener cirugía' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Cirugía no encontrada' });
      }
      res.json(results.rows[0]);
    });
  }

  static crear(req, res) {
    const nuevaCirugia = req.body;
    // La DB se encarga de los timestamps con DEFAULT y TRIGGERS
    // No es necesario asignarlos aquí, pero no causa error si se dejan.

    CirugiaModel.create(nuevaCirugia, (err, result) => {
      if (err) {
        console.error('Error al crear cirugía:', err);
        return res.status(500).json({ error: 'Error al crear cirugía' });
      }
      // **CAMBIO CLAVE**: Obtener el ID desde result.rows[0].id_cirugia
      const nuevoId = result.rows[0].id_cirugia;
      res.status(201).json({ id: nuevoId, ...nuevaCirugia });
    });
  }

  static actualizar(req, res) {
    const id = req.params.id;
    const datos = req.body;
    // El trigger en la DB se encarga de 'actualizado'

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
      res.json(results.rows);
    });
  }

  static obtenerQuirofanos(req, res) {
    CirugiaModel.getQuirofanos((err, results) => {
      if (err) {
        console.error('Error al obtener quirófanos:', err);
        return res.status(500).json({ error: 'Error al obtener quirófanos' });
      }
      res.json(results.rows);
    });
  }
  static crearQuirofano(req, res) {
    const nuevoQuirofano = req.body;
    CirugiaModel.crearQuirofano(nuevoQuirofano, (err, result) => {
      if (err) {
        console.error('Error al crear quirófano:', err);
        return res.status(500).json({ error: 'Error al crear quirófano' });
      }
      const nuevoId = result.rows[0].id_quirofano;
      res.status(201).json({ id: nuevoId, ...nuevoQuirofano });
    });
  }

  static actualizarQuirofano(req, res) {
    const id = req.params.id;
    const datos = req.body;
    CirugiaModel.actualizarQuirofano(id, datos, (err) => {
      if (err) {
        console.error('Error al actualizar quirófano:', err);
        return res.status(500).json({ error: 'Error al actualizar quirófano' });
      }
      res.json({ id, ...datos });
    });
  }

  static eliminarQuirofano(req, res) {
    const id = req.params.id;
    CirugiaModel.eliminarQuirofano(id, (err) => {
      // **CAMBIO**: Manejo de error corregido
      if (err) {
        console.error('Error al eliminar quirófano:', err);
        return res.status(500).json({ error: 'Error al eliminar quirófano' });
      }
      res.json({ success: true, message: 'Quirófano eliminado' });
    });
  }
}

module.exports = CirugiaController;