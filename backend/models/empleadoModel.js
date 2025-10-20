const db = require('../config/db');

class EmpleadoModel {
  static getAll(callback) {
    db.query('SELECT * FROM empleados', callback);
  }

  static getById(id, callback) {
    // Cambiar ? por $1
    db.query('SELECT * FROM empleados WHERE id_empleado = $1', [id], callback);
  }

  static create(empleado, callback) {
    // Esta consulta necesita ser reconstruida para PostgreSQL
    const columns = Object.keys(empleado);
    const values = Object.values(empleado);
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO empleados (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id_empleado`;
    db.query(query, values, callback);
  }

  static update(id, datos, callback) {
    // Esta consulta también necesita ser reconstruida
    const fields = Object.keys(datos).map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = [...Object.values(datos), id];
    const query = `UPDATE empleados SET ${fields} WHERE id_empleado = $${Object.keys(datos).length + 1}`;
    db.query(query, values, callback);
  }

  static delete(id, callback) {
    // Cambiar ? por $1
    db.query('DELETE FROM empleados WHERE id_empleado = $1', [id], callback);
  }

  static getPuestos(callback) {
    db.query('SELECT puesto FROM puestos', callback);
  }

  static getEquipos(callback) {
    db.query('SELECT id_equipo, nombre_equipo FROM equipos', callback);
  }
}

module.exports = EmpleadoModel;