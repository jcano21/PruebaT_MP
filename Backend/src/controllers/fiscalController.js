// src/controllers/fiscalController.js
const { sql, poolPromise } = require('../config/database');

const fiscalController = {
  insertarFiscal: async (req, res) => {
    try {
      const { nombre, id_fiscalia, id_usuario } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre', sql.VarChar(100), nombre)
        .input('id_fiscalia', sql.Int, id_fiscalia)
        .input('id_usuario', sql.Int, id_usuario)
        .execute('InsertarFiscal');
      res.status(201).json({ id_fiscal: result.recordset[0].id_fiscal });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  actualizarFiscal: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, id_fiscalia, id_usuario } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input('id_fiscal', sql.Int, id)
        .input('nombre', sql.VarChar(100), nombre)
        .input('id_fiscalia', sql.Int, id_fiscalia)
        .input('id_usuario', sql.Int, id_usuario)
        .execute('ActualizarFiscal');
      res.status(200).json({ message: 'Fiscal actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  consultarFiscal: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_fiscal', sql.Int, id)
        .execute('ConsultarFiscal');
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Fiscal no encontrado' });
      }
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarFiscales: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('ListarFiscales');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminarFiscal: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      await pool.request()
        .input('id_fiscal', sql.Int, id)
        .execute('EliminarFiscal');
      res.status(200).json({ message: 'Fiscal eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = fiscalController;