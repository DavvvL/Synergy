const db = require('../config/db');

class PacienteModel {
  static getAll(callback) {
    db.query('SELECT * FROM pacientes', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM pacientes WHERE id_paciente = ?', [id], callback);
  }

  static create(paciente, callback) {
    db.query('INSERT INTO pacientes SET ?', paciente, callback);
  }

  static update(id, datos, callback) {
    db.query('UPDATE pacientes SET ? WHERE id_paciente = ?', [datos, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM pacientes WHERE id_paciente = ?', [id], callback);
  }
}

module.exports = PacienteModel;