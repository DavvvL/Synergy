const db = require('../config/db');

class EmpleadoModel {
  static getAll(callback) {
    db.query('SELECT * FROM empleados', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM empleados WHERE id_empleado = ?', [id], callback);
  }

  static create(empleado, callback) {
    db.query('INSERT INTO empleados SET ?', empleado, callback);
  }

  static update(id, datos, callback) {
    db.query('UPDATE empleados SET ? WHERE id_empleado = ?', [datos, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM empleados WHERE id_empleado = ?', [id], callback);
  }

  static getPuestos(callback) {
    db.query('SELECT puesto FROM puestos', callback);
  }

  static getEquipos(callback) {
    db.query('SELECT id_equipo, nombre_equipo FROM equipos', callback);
  }
}

module.exports = EmpleadoModel;