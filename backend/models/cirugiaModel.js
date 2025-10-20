const db = require('../config/db');

class CirugiaModel {
  static getAll(callback) {
    const query = `
      SELECT c.*, p.nombre as paciente_nombre, p.paterno as paciente_paterno,
             q.nombre as quirofano_nombre, e.nombre_equipo, tc.nombre as tipo_nombre
      FROM cirugias c
      LEFT JOIN pacientes p ON c.id_paciente = p.id_paciente
      LEFT JOIN quirofanos q ON c.id_quirofano = q.id_quirofano
      LEFT JOIN equipos e ON c.id_equipo = e.id_equipo
      -- CAMBIO EN LA SIGUIENTE LÍNEA:
      LEFT JOIN tipo_cirugia tc ON c.id_tipo_cirugia = tc.id_tipo_cirugia
    `;
    db.query(query, callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM cirugias WHERE id_cirugia = $1', [id], callback);
  }

  static create(cirugia, callback) {
    const columns = Object.keys(cirugia);
    const values = Object.values(cirugia);
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO cirugias (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id_cirugia`;
    db.query(query, values, callback);
  }

  static update(id, datos, callback) {
    const fields = Object.keys(datos).map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = [...Object.values(datos), id];
    const query = `UPDATE cirugias SET ${fields} WHERE id_cirugia = $${Object.keys(datos).length + 1}`;
    db.query(query, values, callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM cirugias WHERE id_cirugia = $1', [id], callback);
  }

  // **FUNCIÓN RESTAURADA**
  static getTipos(callback) {
    db.query('SELECT * FROM tipo_cirugia', callback);
  }

  // **FUNCIÓN RESTAURADA**
  static getQuirofanos(callback) {
    db.query('SELECT * FROM quirofanos', callback);
  }
}

module.exports = CirugiaModel;