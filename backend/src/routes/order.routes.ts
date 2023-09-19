import express from 'express';
import OrderController from '../controllers/OrderController';
import { adapterRoute } from '../core/infra/adapters/ExpressRouteAdapter';

const orderRoutes = express.Router();

orderRoutes.get('/', adapterRoute(OrderController.listAll));
orderRoutes.get('/:idOrder', adapterRoute(OrderController.list));
orderRoutes.post('/', adapterRoute(OrderController.create));
orderRoutes.put('/:idOrder', adapterRoute(OrderController.update));
orderRoutes.delete('/:idOrder', adapterRoute(OrderController.delete));

export default orderRoutes;
