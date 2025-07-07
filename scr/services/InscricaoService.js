const Inscricao = require('../models/Inscricao');
const Curso = require('../models/Curso');
const sequelize = require('../../config/database');

const InscricaoService = {
    async inscrever(usuarioId, cursoId) {

        try {
            const curso = await Curso.findByPk(cursoId);
            if(!curso) {
                throw {status: 404, mensagem: 'Curso não encontrado!'};
            }

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
        } catch (error) {
            if(error.status) {
                throw error;
            }
            throw { status: 400, mensagem: error.message }
        }
        
    },

    async cancelar(usuarioId, cursoId) {

        try {
            const [inscricaoResult] = await sequelize.query(
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
            if(!inscricaoResult) {
                throw { status: 404, mensagem: 'Inscrição ativa não encontrada.'}
            }

            await sequelize.query(
                `
                UPDATE inscricoes
                SET data_cancelamento = CURRENT_TIMESTAMP
                WHERE id = :id
                `,
                {
                    replacements: { id: inscricaoResult.id},
                    type: sequelize.QueryTypes.UPDATE
                }
            );

            return {...inscricaoResult, data_cancelamento: new Date()};    
        } catch (error) {
                console.log('Erro no cancelamento:', error);

            if(error.status) {
                throw error;
            }
            throw { status: 400, mensagem: error.message }
            
        }
        
    }

}

module.exports = InscricaoService;