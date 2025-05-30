// src/controllers/usuarioController.js
const { sql, poolPromise } = require('../config/database');

const usuarioController = {
  insertarUsuario: async (req, res) => {
    try {
      const { nombre_usuario, contrasena, rol, email } = req.body;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
        .input('contrasena', sql.VarChar(100), contrasena)
        .input('rol', sql.VarChar(50), rol)
        .input('email', sql.VarChar(100), email)
        .execute('InsertarUsuario');
      res.status(201).json({ id_usuario: result.recordset[0].id_usuario });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  actualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_usuario, contrasena, rol, email } = req.body;
      const pool = await poolPromise;
      await pool.request()
        .input('id_usuario', sql.Int, id)
        .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
        .input('contrasena', sql.VarChar(100), contrasena)
        .input('rol', sql.VarChar(50), rol)
        .input('email', sql.VarChar(100), email)
        .execute('ActualizarUsuario');
      res.status(200).json({ message: 'Usuario actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  consultarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_usuario', sql.Int, id)
        .execute('ConsultarUsuario');
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarUsuarios: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().execute('ListarUsuarios');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await poolPromise;
      await pool.request()
        .input('id_usuario', sql.Int, id)
        .execute('EliminarUsuario');
      res.status(200).json({ message: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = usuarioController;