//import { authJwt } from '../services/auth.services';
const userRoutes = require('./users/user.routes');
pedidoRoutes = require('./pedidos/pedido.routes');


module.exports = (app) => {
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/pedidos', pedidoRoutes);
}