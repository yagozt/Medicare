const Doacoes = require('./doacao.model');
const HTTPStatus = require('http-status');

module.exports = {
    async cadastrar(req, res) {
        try {
            const doacao = await Doacoes.create(req.body);
            return res.status(HTTPStatus.OK).json(doacao);
        }
        catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async listarTodos(req, res) {
        try {
            const doacoes = await Doacoes.find({});
            return res.status(HTTPStatus.OK).json(doacoes);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },
}