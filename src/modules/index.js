//import { authJwt } from '../services/auth.services';
const userRoutes = require('./users/user.routes'),
pedidoRoutes = require('./pedidos/pedido.routes'),
doacaoRoutes = require('./doacoes/doacao.routes');


module.exports = (app) => {
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/pedidos', pedidoRoutes);
    app.use('/api/v1/doacoes', doacaoRoutes)
}