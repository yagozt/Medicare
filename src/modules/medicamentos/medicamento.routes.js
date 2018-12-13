const Router = require('express').Router,
    medicamentoController = require('./medicamento.controller'),
    authJwt = require('../../services/auth.services').authJwt;

const routes = new Router();

routes.post('/', medicamentoController.cadastrar);
routes.get('/', medicamentoController.listarTodos);
routes.post('/:id/atualizarSituacao', medicamentoController.atualizarSituacaoMedicamento);
routes.delete('/:id', medicamentoController.remover);
// Medicamentos Comerciais
routes.post('/medicamentoscomerciais', medicamentoController.cadastrarComercial);
routes.get('/medicamentoscomerciais', medicamentoController.listarMedicamentosComercial);
routes.delete('/medicamentoscomerciais/:id', medicamentoController.removerMedicamentoComercial);
module.exports = routes;