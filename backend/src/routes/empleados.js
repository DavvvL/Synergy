const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Obtener todos los empleados
  router.get('/', (req, res) => {
    db.query('SELECT * FROM empleados', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Agregar un nuevo empleado
  router.post('/', (req, res) => {
    const nuevo = req.body;
    console.log('📩 Recibido nuevo empleado:', nuevo);

    db.query('INSERT INTO empleados SET ?', nuevo, (err, result) => {
      if (err) {
        console.error('❌ Error al insertar empleado:', err.sqlMessage || err.message);
        return res.status(500).json({ error: err });
      }
      res.json({ id: result.insertId, ...nuevo });
    });
  });

  // Editar un empleado
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const datos = req.body;
    db.query('UPDATE empleados SET ? WHERE id_empleado = ?', [datos, id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id, ...datos });
    });
  });

  // Eliminar un empleado
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM empleados WHERE id_empleado = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    });
  });

  // 🔽 Obtener opciones de puestos (para <select>)
  router.get('/opciones/puestos', (req, res) => {
    db.query('SELECT puesto FROM puestos', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // 🔽 Obtener opciones de equipos (para <select>)
  router.get('/opciones/equipos', (req, res) => {
    db.query('SELECT id_equipo, nombre_equipo FROM equipos', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  return router;
};