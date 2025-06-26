const Curso = require('../models/Cursos');

const CursoService = {
    async listarCursos() {
        /* Equivale: SELECT * FROM cursos */
        const cursos = await Curso.findAll();
        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: 0,
            inicio: new Date(curso.inicio).toLocaleDateString("pt-br"),
            inscrito: false
        }));

    }   
}

module.exports = CursoService;
