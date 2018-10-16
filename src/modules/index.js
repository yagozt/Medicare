//import { authJwt } from '../services/auth.services';
const userRoutes = require('./users/user.routes');
//postRoutes = require('./posts/post.routes');


module.exports = (app) => {
    app.use('/api/v1/users', userRoutes);
    //app.use('/api/v1/posts', postRoutes);
}