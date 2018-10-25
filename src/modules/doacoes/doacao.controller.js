const Doacao = require('./doacao.model'),
HTTPStatus = require('http-status');

module.exports = {
    async createDoacao(req, res) {
        try {
            const doacao = await Doacao.create(req.body);
            return res.status(HTTPStatus.CREATED).json(doacao);
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    async getAll(req, res) {
        try {
            const doacoes = Doacao.list({});
            return res.status(HTTPStatus.CREATED).json(doacoes);
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    }
}