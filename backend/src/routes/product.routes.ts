import express from 'express';
import ProductController from '../controllers/ProductController';

import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';

const productRoutes = express.Router();

productRoutes.get('', adapterRoute(ProductController.list));
productRoutes.post('', adapterRoute(ProductController.create));
productRoutes.get('/:id', adapterRoute(ProductController.find));
productRoutes.delete('/:id', adapterRoute(ProductController.delete));
productRoutes.put('/:id', adapterRoute(ProductController.update));

productRoutes.post('/:productId/comment', adapterRoute(ProductController.comment));
productRoutes.post('/:productId/rating', adapterRoute(ProductController.rating));
productRoutes.post('/:productId/rates', adapterRoute(ProductController.rates));

export default productRoutes;
