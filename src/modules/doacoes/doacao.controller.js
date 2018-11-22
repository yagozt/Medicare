const Doacao = require('./doacao.model');
const HTTPStatus = require('http-status');

module.exports = {
    async cadastrar(req, res) {
        try {
            const doacao = await Doacao.create(req.body);
            return res.status(HTTPStatus.OK).json(doacao);
        }
        catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async listarTodos(req, res) {
        try {
            const doacoes = await Doacao.find({});
            return res.status(HTTPStatus.OK).json(doacoes);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async atualizarSituacaoDoacao(req, res) {
        try {
            const doacao = await Doacao.findByIdAndUpdate(req.params.id, { status: req.body.status, dataValidacao: Date.now() }, { runValidators: true });
            if (!doacao) {
                return res.sendStatus(HTTPStatus.NOT_FOUND);
            }

            res.status(HTTPStatus.OK).json(doacao);
        } catch (error) {
            console.log(error);
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    }
}