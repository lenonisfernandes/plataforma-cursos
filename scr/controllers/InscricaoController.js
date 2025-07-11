const InscricaoService = require('../services/InscricaoService');

const InscricaoController = {

    async inscrever(req, res) {
        try {
            const usuarioId = req.user.id;
            const cursoId = req.params.idCurso;

            await InscricaoService.inscrever(usuarioId, cursoId);
            res.status(200).json({ mensagem: 'Inscricao realizada com sucesso.' });

        } catch (error) {
            return res.status(error.status || 400).json({ mensagem: error.message });
        }
    },

    async cancelar(req, res) {
        const usuarioId = req.user.id;
        const cursoId = req.params.idCurso;

        try {
            await InscricaoService.cancelar(usuarioId, cursoId);
            res.status(200).json({ mensagem: 'Incrição cancelada com sucesso.'})
        } catch (error) {
                console.log('Erro no cancelamento:', error);

            return res.status(error.status || 400).json({ mensagem: error.messagem });
        }
    }
}

module.exports = InscricaoController;