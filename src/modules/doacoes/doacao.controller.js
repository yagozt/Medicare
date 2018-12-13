const Doacao = require('./doacao.model');
const HTTPStatus = require('http-status');
const mongoose = require('mongoose');

module.exports = {
    async cadastrar(req, res) {
        try {
            const doacao = await Doacao.createDoacao(req.body, req.user._id);
            return res.status(HTTPStatus.OK).json(doacao);
        }
        catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async listarTodos(req, res) {
        try {
            const doacoes = await Doacao.find({}).populate('user').populate({
                path: 'medicamentoComercial',
                populate: { path: 'medicamento' }
            });
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
    },

    async listarPorUsuario(req, res) {
        try {
            const doacoes = await Doacao.find({ user: mongoose.Types.ObjectId(req.user.id) }).populate({
                path: 'medicamentoComercial',
                populate: { path: 'medicamento' }
            });
            return res.status(HTTPStatus.OK).json(doacoes);
        } catch (error) {
            console.log(error);
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async listarPorId(req, res) {
        try {
            const doacao = await Doacao.findById(req.params.id).populate({
                path: 'medicamentoComercial',
                populate: { path: 'medicamento' }
            });
            return res.status(HTTPStatus.OK).json(doacao);
        } catch (error) {
            console.log(error);
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async deletarDoacao(req, res) {
        try {
            const doacao = await Doacao.findById(req.params.id);

            doacao.remove();
            return res.sendStatus(HTTPStatus.NO_CONTENT).json(doacao);
        } catch (error) {
            console.log(error);
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async atualizarDoacao(req, res) {
        try {
            const doacao = await Doacao.findById(req.params.id);
            
            Object.keys(req.body).forEach(elem => doacao[elem] = req.body[elem]);

            doacao.save();
            
            return res.status(HTTPStatus.OK).json(doacao);
        } catch (error) {
            console.log(error);
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },
}
