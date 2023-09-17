import { ProductProps } from './Product';
import { product } from '../core/factories/controllers/ProductFactory ';

type CartProps = {
  id?: number;
  idUser: number;
  products: ProductProps;
  quantity: number;
};

class Cart {
  private cart: CartProps[] = [];

  addProduct(idProduct: number, quantity: number, idUser: number) {
    const productFinded = product.findById(idProduct);

    if (!productFinded) {
      throw new Error('Produto não encontrado');
    }

    this.cart.push({
      id: this.cart.length + 1,
      idUser: idUser,
      products: productFinded,
      quantity: quantity,
    });
  }

  removeProduct(idProduct: number, idUser: number) {
    const index = this.findIndexByIdProductAndIdUser(idProduct, idUser);

    this.cart.splice(index, 1);
  }

  getUserCart(idUser: number): CartProps[] {
    return this.cart.filter((cart: CartProps) => cart.idUser == idUser);
  }

  findIndexByIdProductAndIdUser(idProduct: number, idUser: number): number {
    const cartIndex = this.cart.findIndex(
      (cart: CartProps) =>
        cart.products.id == idProduct && cart.idUser == idUser
    );

    if (cartIndex === -1) {
      return 0;
    }

    return cartIndex;
  }
}

export default Cart;
