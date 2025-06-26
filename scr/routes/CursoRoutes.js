const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');

router.get('/', CursoController.listarCursos);

module.exports = router;