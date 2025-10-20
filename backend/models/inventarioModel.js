const db = require('../config/db');

class InventarioModel {
  static getAll(callback) {
    // Se añade un JOIN para obtener el nombre del catálogo
    const query = `
      SELECT i.*, c.nombre, c.descripcion, c.costo_unitario
      FROM inventario i
      JOIN catalogo c ON i.id_catalogo = c.id_catalogo
    `;
    db.query(query, callback);
  }

  static getById(id, callback) {
    // Cambiar ? por $1 y añadir JOIN
    const query = `
      SELECT i.*, c.nombre, c.descripcion, c.costo_unitario
      FROM inventario i
      JOIN catalogo c ON i.id_catalogo = c.id_catalogo
      WHERE i.id_inventario = $1
    `;
    db.query(query, [id], callback);
  }

  static create(item, callback) {
    // Reconstruir para PostgreSQL
    const columns = Object.keys(item);
    const values = Object.values(item);
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO inventario (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id_inventario`;
    
    db.query(query, values, callback);
  }

  static update(id, datos, callback) {
    // Reconstruir para PostgreSQL
    const fields = Object.keys(datos).map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = [...Object.values(datos), id];
    const query = `UPDATE inventario SET ${fields} WHERE id_inventario = $${Object.keys(datos).length + 1}`;
    
    db.query(query, values, callback);
  }

  static delete(id, callback) {
    // Cambiar ? por $1
    db.query('DELETE FROM inventario WHERE id_inventario = $1', [id], callback);
  }

  static updateCantidad(id, cantidad, callback) {
    // Cambiar ? por $1, $2
    const query = 'UPDATE inventario SET cantidad = $1, ultima_actualizacion = NOW() WHERE id_inventario = $2';
    db.query(query, [cantidad, id], callback);
  }
}

module.exports = InventarioModel;