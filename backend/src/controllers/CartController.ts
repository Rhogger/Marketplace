import * as http from '../core/infra/HttpResponse';
import { cart } from '../core/factories/controllers/CartFactory';

type AddProductRequest = {
  user: { id: number };
  idProduct: number;
  quantity: number;
};

type RemoveProductRequest = {
  user: { id: number };
  idProduct: number;
};

type ListRequest = {
  user: { id: number };
};

class CartController {
  static async add({
    user,
    idProduct,
    quantity,
  }: AddProductRequest): Promise<http.HttpResponse> {
    try {
      cart.addProduct({ userId: user.id, idProduct, quantity });
      return http.created();
    } catch (error) {
      return http.fail(error);
    }
  }

  static async remove({
    idProduct,
    user,
  }: RemoveProductRequest): Promise<http.HttpResponse> {
    try {
      cart.removeProduct({ idProduct, userId: user.id });

      return http.ok();
    } catch (error) {
      return http.fail(error);
    }
  }

  static async update({
    user,
    idProduct,
    quantity,
  }: AddProductRequest): Promise<http.HttpResponse> {
    try {
      cart.updateProductQuantity({ userId: user.id, idProduct, quantity });
      return http.ok();
    } catch (error) {
      return http.fail(error);
    }
  }

  static async list({ user }: ListRequest): Promise<http.HttpResponse> {
    return http.ok(cart.getUserCart(user.id));
  }
}

export default CartController;
