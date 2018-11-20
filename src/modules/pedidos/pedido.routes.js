const Router = require('express').Router,
pedidoController = require('./pedido.controller'),
authJwt = require('../../services/auth.services').authJwt;

const routes = new Router();

routes.post('/', authJwt, pedidoController.cadastrar);
routes.get('/', pedidoController.listarTodos);
routes.get('/user', authJwt, pedidoController.listarPorUserId);
routes.get('/:id', pedidoController.listarPorId);
routes.delete('/:id', pedidoController.deletarPedido)
//routes.post('/:id/validar', pedidoController.validarPedido)

module.exports = routes;