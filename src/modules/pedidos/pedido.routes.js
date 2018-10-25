const Router = require('express').Router,
pedidoController = require('./pedido.controller'),
authJwt = require('../../services/auth.services').authJwt;

const routes = new Router();

routes.post('/', authJwt, pedidoController.cadastrar);
routes.get('/', pedidoController.listarTodos);
routes.get('/user/:userId', authJwt, pedidoController.listarPorUserId);
routes.get('/:id', pedidoController.listarPorId);

module.exports = routes;