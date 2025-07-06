const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.use(authMiddleware);

router.get('/:idUsuario', CursoController.listarCursosInscritos);

module.exports = router;