// models/catalogoModel.js
const db = require('../config/db');

class CatalogoModel {
  static getAll(callback) {
    db.query('SELECT * FROM catalogo ORDER BY nombre ASC', callback);
  }
  // Aquí podrías añadir en el futuro las funciones para crear, editar, etc.
}

module.exports = CatalogoModel;