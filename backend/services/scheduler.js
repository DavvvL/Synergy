// services/scheduler.js
const cron = require('node-cron');
const db = require('../config/db');

// Esta función se ejecutará cada 5 minutos
const iniciarPlanificadorDeCirugias = () => {
  cron.schedule('* * * * *', async () => {
    console.log('⏰ Ejecutando planificador de cirugías...');

    try {
      // 1. ACTUALIZAR CIRUGÍAS A "En Progreso" (SIN CAMBIOS)
      const queryProgreso = `
        UPDATE cirugias
        SET estado = 'En Progreso'
        WHERE estado = 'Programada'
        AND fecha_inicio <= NOW();
      `;
      await db.query(queryProgreso);

      // ======================================================
      // INICIO DE LA CORRECCIÓN: Usar la columna 'fecha_fin'
      // ======================================================
      // 2. ACTUALIZAR CIRUGÍAS A "Finalizada"
      // Busca cirugías 'En Progreso' cuya fecha de fin guardada ya pasó.
      const queryFinalizada = `
        UPDATE cirugias
        SET estado = 'Finalizada'
        WHERE estado = 'En Progreso'
        AND fecha_fin <= NOW();
      `;
      // ======================================================
      // FIN DE LA CORRECCIÓN
      // ======================================================
      
      await db.query(queryFinalizada);
      
      console.log('Planificador de cirugías finalizado.');

    } catch (error) {
      console.error('❌ Error en el planificador de cirugías:', error);
    }
  });
};

module.exports = { iniciarPlanificadorDeCirugias };