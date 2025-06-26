const CursoService = require('../services/CursoService');

const CursoController = {
    async listarCursos(req, res) {
        try {
            const cursos = await CursoService.listarCursos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json( { message: "Erro ao buscar cursos. " + error });
        }
    }
}

module.exports = CursoController;