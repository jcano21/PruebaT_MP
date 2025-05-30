const express = require('express');
const router = express.Router();
const fiscaliaController = require('../controllers/fiscaliaController');
const estadoCasoController = require('../controllers/estadoCasoController');
const usuarioController = require('../controllers/usuarioController');
const fiscalController = require('../controllers/fiscalController');
const casoController = require('../controllers/casoController');
const logReasignacionController = require('../controllers/logReasignacionController');
const authController = require('../controllers/authController');

router.post('/login', authController.login);

// Rutas para Fiscalía
router.post('/fiscalias', fiscaliaController.insertarFiscalia);
router.put('/fiscalias/:id', fiscaliaController.actualizarFiscalia);
router.get('/fiscalias/:id', fiscaliaController.consultarFiscalia);
router.get('/fiscalias', fiscaliaController.listarFiscalias);
router.delete('/fiscalias/:id', fiscaliaController.eliminarFiscalia);

// Rutas para EstadoCaso
router.post('/estados-caso', estadoCasoController.insertarEstadoCaso);
router.put('/estados-caso/:id', estadoCasoController.actualizarEstadoCaso);
router.get('/estados-caso/:id', estadoCasoController.consultarEstadoCaso);
router.get('/estados-caso', estadoCasoController.listarEstadosCaso);
router.delete('/estados-caso/:id', estadoCasoController.eliminarEstadoCaso);

// Rutas para Usuario
router.post('/usuarios', usuarioController.insertarUsuario);
router.put('/usuarios/:id', usuarioController.actualizarUsuario);
router.get('/usuarios/:id', usuarioController.consultarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

// Rutas para Fiscal
router.post('/fiscales', fiscalController.insertarFiscal);
router.put('/fiscales/:id', fiscalController.actualizarFiscal);
router.get('/fiscales/:id', fiscalController.consultarFiscal);
router.get('/fiscales', fiscalController.listarFiscales);
router.delete('/fiscales/:id', fiscalController.eliminarFiscal);

// Rutas para Caso
router.post('/casos', casoController.insertarCaso);
router.put('/casos/:id', casoController.actualizarCaso);
router.get('/casos/:id', casoController.consultarCaso);
router.get('/casos', casoController.listarCasos);
router.delete('/casos/:id', casoController.eliminarCaso);
router.post('/casos/:id/asignar-fiscal', casoController.asignarFiscalCaso);
router.post('/casos/:id/reasignar-fiscal', casoController.reasignarCaso);

// Rutas para LogReasignacion
router.get('/logs-reasignacion/:id', logReasignacionController.consultarLogReasignacion);
router.get('/logs-reasignacion', logReasignacionController.listarLogsReasignacion);

module.exports = router;