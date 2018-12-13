const Router = require('express').Router,
    doacaoController = require('./doacao.controller'),
    authJwt = require('../../services/auth.services').authJwt;

const routes = new Router();

routes.post('/', authJwt, doacaoController.cadastrar);
routes.get('/', doacaoController.listarTodos);
routes.get('/user', authJwt, doacaoController.listarPorUsuario);
routes.get('/:id', doacaoController.listarPorId);
routes.delete('/:id', doacaoController.deletarDoacao);
routes.put('/:id', doacaoController.atualizarDoacao);
routes.post('/:id/atualizarSituacao', doacaoController.atualizarSituacaoDoacao);

module.exports = routes;
