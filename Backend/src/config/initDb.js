// backend/initDb.js
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

// Configuración desde variables de entorno
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: false, 
    trustServerCertificate: true,
  },
};

async function initDatabase() {
  try {
    const pool = await sql.connect(config);
    const script = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');
    const statements = script.split(/GO\s*[\r\n]/gi); // Separar por "GO"

    for (const stmt of statements) {
      if (stmt.trim()) {
        await pool.request().batch(stmt);
      }
    }

    console.log(' Base de datos inicializada correctamente');
    await pool.close();
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
}

module.exports = initDatabase;
