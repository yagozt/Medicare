const Router = require('express').Router,
doacaoController = require('./doacao.controller');

const routes = new Router();

routes.post('/', doacaoController.cadastrar);
routes.get('/', doacaoController.listarTodos);

module.exports = routes;