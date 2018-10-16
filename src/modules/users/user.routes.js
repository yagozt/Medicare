const Router = require('express').Router,
validate = require('express-validation'),
userController = require('./user.controller'),
userValidations = require('./user.validations'),
authLocal = require('../../services/auth.services').authLocal;

const routes = new Router();

routes.post('/signup', userController.signUp);
routes.post('/login', authLocal, userController.login);

module.exports = routes;