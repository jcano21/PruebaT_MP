const { sql, poolPromise } = require('../config/database');

const casoController = {
  insertarCaso: async (req, res) => {
    try {
      const { descripcion, id_estado, id_fiscalia } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('descripcion', sql.Text, descripcion)
        .input('id_estado', sql.Int, id_estado)
        .input('id_fiscalia', sql.Int, id_fiscalia)
        .execute('InsertarCaso');
      res.status(201).json({ id_caso: result.recordset[0].id_caso });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

actualizarCaso: async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, id_estado, id_fiscalia, id_fiscal } = req.body;
    const pool = await poolPromise;

    await pool.request()
      .input('id_caso', sql.Int, id)
      .input('descripcion', sql.Text, descripcion)
      .input('id_estado', sql.Int, id_estado)
      .input('id_fiscalia', sql.Int, id_fiscalia)
      .input('id_fiscal', sql.Int, id_fiscal)
      .execute('ActualizarCaso');

    res.status(200).json({ message: 'Caso actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

  consultarCaso: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_caso', sql.Int, id)
        .execute('ConsultarCaso');
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Caso no encontrado' });
      }
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarCasos: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('ListarCasos');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminarCaso: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      await pool.request()
        .input('id_caso', sql.Int, id)
        .execute('EliminarCaso');
      res.status(200).json({ message: 'Caso eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  asignarFiscalCaso: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_fiscal_nuevo } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input('id_caso', sql.Int, id)
        .input('id_fiscal_nuevo', sql.Int, id_fiscal_nuevo)
        .execute('AsignarFiscalCaso');
      res.status(200).json({ message: 'Fiscal asignado al caso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  reasignarCaso: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_fiscal_nuevo } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input('id_caso', sql.Int, id)
        .input('id_fiscal_nuevo', sql.Int, id_fiscal_nuevo)
        .execute('ReasignarCaso');
      res.status(200).json({ message: 'Caso reasignado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = casoController;