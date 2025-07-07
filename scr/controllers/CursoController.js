const CursoService = require('../services/CursoService');

const CursoController = {
    async listarCursos(req, res) {
        try {
            const filtro = req.query.filtro || null;
            const usuarioId = req.user.id;
            const cursos = await CursoService.listarCursos(usuarioId, filtro);
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json( { mensagem: error.message });
        }
    },
    async listarCursosInscritos(req, res) {

        try {
            const usuarioLogado = req.user.id;
            const usuarioSolicitadoId = req.params.idUsuario;
            
            console.log('usuarioLogado:', usuarioLogado, typeof usuarioLogado);
            console.log('usuarioSolicitadoId:', usuarioSolicitadoId, typeof usuarioSolicitadoId);

            if(String(usuarioLogado) != String(usuarioSolicitadoId)) {
                return res.status(403).json( { mensagem: 'Você não pode acessar cursos de outros usuários.'});
            }

            const cursos = await CursoService.listarCursosInscritos(usuarioLogado);
            return res.status(200).json(cursos);      
        } catch (error) {
            return res.status(500).json({ mensagem: error.message });
        }
        

    }
}

module.exports = CursoController;