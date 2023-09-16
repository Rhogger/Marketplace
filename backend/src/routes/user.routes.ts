import express from 'express';
import UserController from '../controllers/UserController';

import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import { adapterMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter';

const userRoutes = express.Router();

userRoutes.post('/register', adapterRoute(UserController.register));
userRoutes.get('', adapterMiddleware(new TokenMiddleware), adapterRoute(UserController.list));
userRoutes.get('/:id', adapterMiddleware(new TokenMiddleware), adapterRoute(UserController.find));

export default userRoutes;
