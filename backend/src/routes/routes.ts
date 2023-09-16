import express from 'express';
import AuthController from '../controllers/AuthController';
import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';

const router = express.Router();

router.post('/signin', adapterRoute(AuthController.signin));

router.post('/signup', adapterRoute(AuthController.signup));

export default router;
