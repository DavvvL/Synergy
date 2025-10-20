require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432 
});

db.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error de conexión a PostgreSQL:', err.stack);
    process.exit(1); // Salir si no se puede conectar
  } else {
    console.log('✅ Conectado a PostgreSQL');
    release(); // Liberar el cliente
  }
});

// 4. Exportar el objeto db (Pool)
module.exports = db;