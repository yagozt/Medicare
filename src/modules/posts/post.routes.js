import { Router } from 'express';
import validate from 'express-validation';
import * as postController from './post.controller';
import { authJwt } from '../../services/auth.services';
import postValidation from './post.validations';

const routes = new Router();
routes.post('/', authJwt, validate(postValidation.createPost), postController.createPost,);
routes.get('/:id', authJwt, postController.getPostById);
routes.get('/', authJwt, postController.getAllPosts);
routes.patch('/:id', authJwt, validate(postValidation.updatePost), postController.updatePost);
routes.delete('/:id', authJwt, postController.deletePost);
routes.post('/:id/favorite', authJwt, postController.favoritePost);

export default routes;