require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const cirugiaRoutes = require('./routes/cirugiaRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes'); // <-- 1. IMPORTA LA NUEVA RUTA

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/cirugias', cirugiaRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/catalogo', catalogoRoutes); // <-- 2. USA LA NUEVA RUTA

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Clínica Synergy',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      empleados: '/api/empleados',
      pacientes: '/api/pacientes',
      cirugias: '/api/cirugias',
      inventario: '/api/inventario'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;