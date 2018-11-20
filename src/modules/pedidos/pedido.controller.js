const Pedido = require('./pedido.model'),
mongoose = require('mongoose'),
HTTPStatus = require('http-status');

module.exports = {
    async cadastrar(req, res) {
        try {
            const pedido = await Pedido.createPedido(req.body, req.user._id);
            return res.status(HTTPStatus.CREATED).json(pedido);
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    async listarTodos(req, res) {
        try {
            const pedidos = await Pedido.find().populate('user');
            return res.status(HTTPStatus.OK).json(pedidos);
        } catch (e) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(e);
        }
    },

    async listarPorUserId(req, res) {
        try {
            const pedidos = await Pedido.find({ user: mongoose.Types.ObjectId(req.user.id) });
            return res.status(HTTPStatus.OK).json(pedidos);
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    async listarPorId(req, res) {
        try {
            const pedidos = await Pedido.findById(req.params.id);
            return res.status(HTTPStatus.OK).json(pedidos);
        } catch (e) {
            console.log(e);
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    async deletarPedido(req, res) {
        try {
            await Pedido.findByIdAndDelete(req.params.id);
            return res.status(HTTPStatus.NO_CONTENT).json();
        } catch (e) {
            console.log(e);
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    }
}