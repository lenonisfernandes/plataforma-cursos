const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const InscricaoController = require('../controllers/InscricaoController');

router.use(authMiddleware)

router.get('/', CursoController.listarCursos);
router.post('/:idCurso', InscricaoController.inscrever);
router.patch('/:idCurso', InscricaoController.cancelar);
router.get('/inscritos/:idUsuario', CursoController.listarCursosInscritos);

module.exports = router;