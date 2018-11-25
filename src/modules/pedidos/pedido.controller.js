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
            const pedido = await Pedido.findById(req.params.id);
            if (!pedido.user.equals(req.user._id))
                return res.sendStatus(HTTPStatus.UNAUTHORIZED);
            
            pedido.remove();
            return res.sendStatus(HTTPStatus.NO_CONTENT);
        } catch (e) {
            console.log(e);
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    async atualizarSituacaoPedido(req, res) {
        try {
            const pedido = await Pedido.findByIdAndUpdate(req.params.id, { status: req.body.status, dataValidacao: Date.now() }, { runValidators: true });
            if (!pedido) {
                return res.sendStatus(HTTPStatus.NOT_FOUND);
            }
            if (!pedido.user.equals(req.user._id)) {
                return res.sendStatus(HTTPStatus.UNAUTHORIZED);
            }

            res.status(HTTPStatus.OK).json(pedido);
        } catch (error) {
            console.log(error);
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    }
}