import * as http from '../core/infra/HttpResponse';
import { order } from '../core/factories/controllers/OrderFactory';
import { CartProps } from '../models/Cart';

type CreateRequest = {
  user: { id: number };
  products: CartProps[];
  date: Date;
  cep: string;
};

type ListRequest = {
  user: { id: number };
  idOrder: number;
};

type ListAllRequest = {
  user: { id: number };
};

type UpdateRequest = {
  user: { id: number };
  idOrder: number;
  status?: "processando" | "enviado" | "entregue";
};

type DeleteRequest = ListRequest;

class OrderController {
  static async create({
    user,
    products,
    cep
  }: CreateRequest): Promise<http.HttpResponse> {
    try {
      await order.createOrder({
        userId: user.id,
        products,
        cep,
      });

      return http.created();
    } catch (error) {
      return http.fail(error);
    }
  }

  static async list({
    user,
    idOrder,
  }: ListRequest): Promise<http.HttpResponse> {
    try {
      return http.ok(order.getOrder({ userId: user.id, id: idOrder }));
    } catch (error) {
      return http.fail(error);
    }
  }

  static async listAll({ user }: ListAllRequest): Promise<http.HttpResponse> {
    try {
      return http.ok(order.getOrders(user.id));
    } catch (error) {
      return http.fail(error);
    }
  }

  static async update({
    user,
    idOrder,
    status,
  }: UpdateRequest): Promise<http.HttpResponse> {
    try {
      order.updateStatusOrder({ userId: user.id, id: idOrder, status });

      return http.ok();
    } catch (error) {
      return http.fail(error);
    }
  }

  static async delete({
    user,
    idOrder,
  }: DeleteRequest): Promise<http.HttpResponse> {
    try {
      order.deleteOrder({ userId: user.id, id: idOrder });

      return http.ok();
    } catch (error) {
      return http.fail(error);
    }
  }
}

export default OrderController;
