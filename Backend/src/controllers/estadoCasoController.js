// src/controllers/estadoCasoController.js
const { sql, poolPromise } = require('../config/database');

const estadoCasoController = {
  insertarEstadoCaso: async (req, res) => {
    try {
      const { nombre_estado } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre_estado', sql.VarChar(50), nombre_estado)
        .execute('InsertarEstadoCaso');
      res.status(201).json({ id_estado: result.recordset[0].id_estado });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  actualizarEstadoCaso: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_estado } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input('id_estado', sql.Int, id)
        .input('nombre_estado', sql.VarChar(50), nombre_estado)
        .execute('ActualizarEstadoCaso');
      res.status(200).json({ message: 'Estado de caso actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  consultarEstadoCaso: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_estado', sql.Int, id)
        .execute('ConsultarEstadoCaso');
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Estado de caso no encontrado' });
      }
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarEstadosCaso: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('ListarEstadosCaso');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminarEstadoCaso: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      await pool.request()
        .input('id_estado', sql.Int, id)
        .execute('EliminarEstadoCaso');
      res.status(200).json({ message: 'Estado de caso eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = estadoCasoController;