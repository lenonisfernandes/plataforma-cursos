const express = require('express');
const InscricaoController = require('../controllers/InscricaoController');
const authMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.use(authMiddleware)

router.post('/:idCurso', InscricaoController.inscrever);
router.patch('/:idCurso', InscricaoController.cancelar);

module.exports = router;