const Router = require('express').Router,
doacaoController = require('./doacao.controller');

const routes = new Router();

routes.post('/doacao', doacaoController.createDoacao);
routes.get('/doacao', doacaoController.getAll);

module.exports = routes;