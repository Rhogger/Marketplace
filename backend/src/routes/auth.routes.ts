import express from 'express';
import AuthController from '../controllers/AuthController';
import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';

const authRoutes = express.Router();

authRoutes.post('/login', adapterRoute(AuthController.signin));

export default authRoutes;
