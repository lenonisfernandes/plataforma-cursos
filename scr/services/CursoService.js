const sequelize = require('../../config/database');
const { listarCursosInscritos } = require('../controllers/CursoController');
const Curso = require('../models/Curso');
const Inscricao = require('../models/Inscricao');
const { Op } = require('sequelize');

const CursoService = {
    async listarCursos(usuarioId, filtro) {
        const whereClause = filtro ? {
            [Op.or]: [
                {nome: {[Op.like]: `%${filtro}%`}},
                {descricao: {[Op.like]: `%${filtro}%`}}
            ]
        } : {};

        const cursos = await Curso.findAll({
            where: whereClause,
            include: {
                model: Inscricao,
                attributes: []
            },
            attributes: {
                include: [
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id)`), 
                            'total_inscricoes'
                    ],
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id AND 
                            inscricoes.usuario_id = ${usuarioId})`), 'usuario_inscricao'
                    ]
                ]
            }
        });

        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: curso.getDataValue('total_inscricoes'),
            inicio: new Date(curso.inicio).toLocaleDateString("pt-br"),
            inscrito: curso.getDataValue('usuario_inscricao') > 0
        }));

    },
    async listarCursosInscritos(usuarioId) {
        const cursos = await Curso.findAll({
            include:[{
                model: Inscricao,
                where: {
                    usuario_id: usuarioId
                },
                require: true
            }],
            attributes: {
                include: [
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM inscricoes WHERE inscricoes.curso_id = Curso.id)'), 'total_inscricoes'
                    ],
                    [
                        sequelize.literal('(inscricaos.data_cancelamento is NOT NULL)'), 'inscricao_cancelada'
                    ]
                ]
            }
        });
        
        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricao: curso.getDataValue('total_inscricoes'),
            inicio: new Date(curso.inicio).toLocaleDateString('pt-br'),
            inscricao_cancelada: curso.getDataValue('inscricao_cancelada'),
            inscrito: true
        }));
    }   
}

module.exports = CursoService;
