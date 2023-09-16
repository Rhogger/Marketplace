import express from 'express';
import AuthController from '../controllers/AuthController';
import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';

const authRoutes = express.Router();

authRoutes.post('/signin', adapterRoute(AuthController.signin));

authRoutes.post('/signup', adapterRoute(AuthController.signup));

export default authRoutes;
