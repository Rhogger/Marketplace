import express from 'express';
import UserController from '../controllers/UserController';

import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';

const userRoutes = express.Router();

userRoutes.get('/', adapterRoute(UserController.open));

export default userRoutes;
