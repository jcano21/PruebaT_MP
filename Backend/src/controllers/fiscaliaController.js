// src/controllers/fiscaliaController.js
const { sql, poolPromise } = require('../config/database');

const fiscaliaController = {
  insertarFiscalia: async (req, res) => {
    try {
      const { nombre, ubicacion } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre', sql.VarChar(100), nombre)
        .input('ubicacion', sql.VarChar(200), ubicacion)
        .execute('InsertarFiscalia');
      res.status(201).json({ id_fiscalia: result.recordset[0].id_fiscalia });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  actualizarFiscalia: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, ubicacion } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input('id_fiscalia', sql.Int, id)
        .input('nombre', sql.VarChar(100), nombre)
        .input('ubicacion', sql.VarChar(200), ubicacion)
        .execute('ActualizarFiscalia');
      res.status(200).json({ message: 'Fiscalía actualizada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  consultarFiscalia: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_fiscalia', sql.Int, id)
        .execute('ConsultarFiscalia');
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Fiscalía no encontrada' });
      }
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarFiscalias: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('ListarFiscalias');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminarFiscalia: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      await pool.request()
        .input('id_fiscalia', sql.Int, id)
        .execute('EliminarFiscalia');
      res.status(200).json({ message: 'Fiscalía eliminada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = fiscaliaController;