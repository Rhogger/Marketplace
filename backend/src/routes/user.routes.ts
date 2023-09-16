import express from 'express';
import UserController from '../controllers/UserController';

import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import { adapterMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter';
import { tokenMiddleware } from '../core/factories/middlewares/TokenMiddlewareFactory';

const userRoutes = express.Router();

userRoutes.post('/register', adapterRoute(UserController.register));

// Rotas especificas protegidas
userRoutes.get('', adapterMiddleware(tokenMiddleware), adapterRoute(UserController.list));
userRoutes.get('/:id', adapterMiddleware(tokenMiddleware), adapterRoute(UserController.find));

export default userRoutes;
