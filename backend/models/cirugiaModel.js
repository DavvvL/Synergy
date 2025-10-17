const db = require('../config/db');

class CirugiaModel {
  static getAll(callback) {
    db.query(`
      SELECT c.*, p.nombre as paciente_nombre, p.paterno as paciente_paterno,
             q.nombre as quirofano_nombre, e.nombre_equipo
      FROM cirujias c
      LEFT JOIN pacientes p ON c.id_paciente = p.id_paciente
      LEFT JOIN quirofanos q ON c.id_quirofano = q.id_quirofano
      LEFT JOIN equipos e ON c.id_equipo = e.id_equipo
    `, callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM cirujias WHERE id_cirujia = ?', [id], callback);
  }

  static create(cirugia, callback) {
    db.query('INSERT INTO cirujias SET ?', cirugia, callback);
  }

  static update(id, datos, callback) {
    db.query('UPDATE cirujias SET ? WHERE id_cirujia = ?', [datos, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM cirujias WHERE id_cirujia = ?', [id], callback);
  }

  static getTipos(callback) {
    db.query('SELECT * FROM tipo_cirujia', callback);
  }

  static getQuirofanos(callback) {
    db.query('SELECT * FROM quirofanos', callback);
  }
}

module.exports = CirugiaModel;