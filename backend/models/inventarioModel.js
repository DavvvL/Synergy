const db = require('../config/db');

class InventarioModel {
  static getAll(callback) {
    db.query('SELECT * FROM inventario', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM inventario WHERE id_inventario = ?', [id], callback);
  }

  static create(item, callback) {
    db.query('INSERT INTO inventario SET ?', item, callback);
  }

  static update(id, datos, callback) {
    db.query('UPDATE inventario SET ? WHERE id_inventario = ?', [datos, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM inventario WHERE id_inventario = ?', [id], callback);
  }

  static updateCantidad(id, cantidad, callback) {
    db.query('UPDATE inventario SET cantidad = ? WHERE id_inventario = ?', [cantidad, id], callback);
  }
}

module.exports = InventarioModel;