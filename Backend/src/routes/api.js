const { sql, poolPromise } = require('../config/database');

async function probarConexion() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1 AS prueba');
    console.log('Resultado de prueba:', result.recordset);
  } catch (err) {
    console.error('Error al ejecutar la prueba de conexión:', err);
  }
}

probarConexion();