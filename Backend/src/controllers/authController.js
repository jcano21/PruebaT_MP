
const { sql, poolPromise } = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
  login: async (req, res) => {
    try {
      const { nombre_usuario, contrasena } = req.body;
      if (!nombre_usuario || !contrasena) {
        return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
      }

      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
        .input('contrasena', sql.VarChar(100), contrasena)
        .execute('AutenticarUsuario');

      if (result.recordset.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const user = result.recordset[0];

      // const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
      // if (!isPasswordValid) {
      //   return res.status(401).json({ error: 'Credenciales inválidas' });
      // }

      // Generate JWT
      const token = jwt.sign(
        { id_usuario: user.id_usuario, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        token,
        user: {
          id_usuario: user.id_usuario,
          nombre_usuario: user.nombre_usuario,
          rol: user.rol,
          email: user.email
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = authController;