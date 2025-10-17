require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
    process.exit(1);
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

module.exports = db;