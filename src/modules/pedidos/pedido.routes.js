const Router = require('express').Router,
pedidoController = require('./pedido.controller'),
authJwt = require('../../services/auth.services').authJwt;

const routes = new Router();

routes.post('/', authJwt, pedidoController.cadastrar);
routes.get('/', pedidoController.listarTodos);
routes.get('/user', authJwt, pedidoController.listarPorUserId);
routes.get('/:id', pedidoController.listarPorId);
routes.delete('/:id', authJwt, pedidoController.deletarPedido);
routes.post('/:id/atualizar', authJwt, pedidoController.atualizarSituacaoPedido);

module.exports = routes;