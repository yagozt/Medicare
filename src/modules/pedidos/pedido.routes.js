const Router = require('express').Router,
    pedidoController = require('./pedido.controller'),
    authJwt = require('../../services/auth.services').authJwt;

const routes = new Router();

routes.post('/', authJwt, pedidoController.cadastrar);
routes.get('/', pedidoController.listarTodos);
routes.get('/:id', pedidoController.listarPorId);
routes.put('/:id', authJwt, pedidoController.atualizarPedido);
routes.delete('/:id', authJwt, pedidoController.deletarPedido);
routes.get('/user', authJwt, pedidoController.listarPorUserId);
routes.post('/:id/atualizarSituacao', authJwt, pedidoController.atualizarSituacaoPedido);

module.exports = routes;