import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import { adapterMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter';
import TokenMiddleware from '../middlewares/TokenMiddleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', adapterMiddleware(new TokenMiddleware), userRoutes);

export default router;