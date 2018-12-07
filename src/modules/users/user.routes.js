const Router = require('express').Router,
    validate = require('express-validation'),
    userController = require('./user.controller'),
    userValidations = require('./user.validations'),
    { authLocal, authJwt } = require('../../services/auth.services');

const routes = new Router();

routes.post('/cadastrar', userController.cadastrar);
routes.post('/login', authLocal, userController.login);
routes.get('/', userController.listarUsuarios);
routes.delete('/:id', authJwt, userController.remover);

module.exports = routes;