const Inscricao = require('../models/Inscricao');
const Curso = require('../models/Curso');
const sequelize = require('../../config/database');

const InscricaoService = {
    async inscrever(usuarioId, cursoId) {
        const curso = await Curso.findByPk(cursoId);
        if(!curso) throw new Error('Curso não encontrado!');

        const existente = await Inscricao.findOne( {
            where: {
                usuario_id: usuarioId,
                curso_id: cursoId,
                data_cancelamento: null
            }
        });

        if(existente) throw new Error('Usuário já inscrito nesse curso.');

        const novaInscricao = await Inscricao.create({
            usuario_id: usuarioId,
            curso_id: cursoId,
            data_cancelameno: null,
            data_inscricao: new Date()
        })

        return novaInscricao;
    },

    async cancelar(usuarioId, cursoId) {
        const [result] = await sequelize.query(
            `
            SELECT * FROM inscricoes
            WHERE usuario_id = :usuarioId
                AND curso_id = :cursoId
                AND data_cancelamento IS NULL
            LIMIT 1
            `, {
                replacements: { usuarioId, cursoId },
                type: sequelize.QueryTypes.SELECT
            }
        );
        if(!result) throw new Error('Inscrição ativa não encontrada.');

        await sequelize.query(
            `
            UPDATE inscricoes
            SET data_cancelamento = CURRENT_TIMESTAMP
            WHERE id = :id
            `,
            {
                replacements: { id: result.id},
                type: sequelize.QueryTypes.UPDATE
            }
        );

        return {...result, data_cancelament: new Date()};
    }

}

module.exports = InscricaoService;