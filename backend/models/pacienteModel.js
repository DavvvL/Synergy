const db = require('../config/db');

class PacienteModel {
  static getAll(callback) {
    db.query('SELECT * FROM pacientes', callback);
  }

  static getById(id, callback) {
    // Cambiar ? por $1
    db.query('SELECT * FROM pacientes WHERE id_paciente = $1', [id], callback);
  }

  static create(paciente, callback) {
    // Reconstruir para PostgreSQL y retornar el ID
    const columns = Object.keys(paciente);
    const values = Object.values(paciente);
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO pacientes (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id_paciente`;

    db.query(query, values, callback);
  }

  static update(id, datos, callback) {
    // Reconstruir para PostgreSQL
    const fields = Object.keys(datos).map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = [...Object.values(datos), id];
    const query = `UPDATE pacientes SET ${fields} WHERE id_paciente = $${Object.keys(datos).length + 1}`;

    db.query(query, values, callback);
  }

  static delete(id, callback) {
    // Cambiar ? por $1
    db.query('DELETE FROM pacientes WHERE id_paciente = $1', [id], callback);
  }
}

module.exports = PacienteModel;