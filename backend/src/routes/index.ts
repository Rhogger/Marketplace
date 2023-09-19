import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import { adapterMiddleware } from '../core/infra/adapters/ExpressMiddlewareAdapter';
import { tokenMiddleware } from '../core/factories/middlewares/TokenMiddlewareFactory';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/product', adapterMiddleware(tokenMiddleware), productRoutes);
router.use('/cart', adapterMiddleware(tokenMiddleware), cartRoutes);
router.use('/order', adapterMiddleware(tokenMiddleware), orderRoutes);

export default router;
