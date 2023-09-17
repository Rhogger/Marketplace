import express from 'express';
import CartController from '../controllers/CartController';
import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';

const cartRoutes = express.Router();

cartRoutes.get('/', adapterRoute(CartController.list));
cartRoutes.post('/:idProduct', adapterRoute(CartController.add));
cartRoutes.put('/:idProduct', adapterRoute(CartController.update));
cartRoutes.delete('/:idProduct', adapterRoute(CartController.remove));

export default cartRoutes;
