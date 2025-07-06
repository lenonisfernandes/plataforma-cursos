const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.get('/', UsuarioController.listar);
router.post('/', UsuarioController.cadastrar);

module.exports = router;