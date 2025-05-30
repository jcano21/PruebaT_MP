// src/controllers/logReasignacionController.js
const { sql, poolPromise } = require('../config/database');

const logReasignacionController = {
  consultarLogReasignacion: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_log', sql.Int, id)
        .execute('ConsultarLogReasignacion');
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Log de reasignación no encontrado' });
      }
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarLogsReasignacion: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('ListarLogsReasignacion');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  insertarLogReasignacion: async (req, res) => {
    try {
      const { id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_caso', sql.Int, id_caso)
        .input('id_fiscal_anterior', sql.Int, id_fiscal_anterior || null)
        .input('id_fiscal_nuevo', sql.Int, id_fiscal_nuevo)
        .input('motivo', sql.Text, motivo)
        .execute('InsertarLogReasignacion');
      res.status(201).json({ id_log: result.recordset[0].id_log });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = logReasignacionController;