require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MySQL
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

// Middleware (IMPORTANTE: primero cors y json)
app.use(cors());
app.use(express.json());

// Ahora importa y usa el router (UNA sola vez)
const empleadosRouter = require('./routes/empleados')(db);
app.use('/api/empleados', empleadosRouter);

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

// Arranca servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});