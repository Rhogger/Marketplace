import * as http from '../core/infra/HttpResponse';
import { cart } from '../core/factories/controllers/CartFactory';

type AddProductRequest = {
  idProduct: number;
  idUser: number;
  quantity: number;
};

type RemoveProductRequest = {
  idProduct: number;
  idUser: number;
};

class CartController {
  static async add({
    idProduct,
    idUser,
    quantity,
  }: AddProductRequest): Promise<http.HttpResponse> {
    cart.addProduct(idProduct, idUser, quantity);

    return http.created();
  }

  static async remove({
    idProduct,
    idUser,
  }: RemoveProductRequest): Promise<http.HttpResponse> {
    try {
      cart.removeProduct(idProduct, idUser);

      http.ok();
    } catch (error) {
      return http.fail(error);
    }

    return http.created();
  }
}

export default CartController;
