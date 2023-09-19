import { ProductProps } from './Product';
import { product } from '../core/factories/controllers/ProductFactory ';

export type CartProps = {
  id?: number;
  userId: number;
  products: ProductProps;
  quantity: number;
};

type AddProductsProps = {
  userId: number;
  idProduct: number;
  quantity: number;
};

type RemoveProductProps = {
  idProduct: number;
  userId: number;
};

type UpdateProductProps = {
  userId: number;
  idProduct: number;
  quantity: number;
};

class Cart {
  private cart: CartProps[] = [];

  addProduct(productOfCart: AddProductsProps) {
    if (productOfCart.quantity < 0) {
      throw new Error(
        'Quantidade inválida. Permitido apenas números positivos!'
      );
    }

    const productFinded = product.findById(productOfCart.idProduct);

    if (!productFinded) {
      throw new Error('Produto não encontrado');
    }

    try {
      const productsCart = this.findByIdProductAndUserId(
        productOfCart.idProduct,
        productOfCart.userId
      );

      this.updateProductQuantity({
        userId: productOfCart.userId,
        idProduct: productOfCart.idProduct,
        quantity: productOfCart.quantity + productsCart.quantity,
      });

      return;
    } catch (error) {}

    this.cart.push({
      id: this.cart.length + 1,
      userId: productOfCart.userId,
      products: productFinded,
      quantity: productOfCart.quantity,
    });
  }

  removeProduct(productOfCart: RemoveProductProps) {
    const index = this.findIndexByIdProductAndUserId(
      productOfCart.idProduct,
      productOfCart.userId
    );

    this.cart.splice(index, 1);
  }

  updateProductQuantity(productOfCart: UpdateProductProps) {
    const index = this.findIndexByIdProductAndUserId(
      productOfCart.idProduct,
      productOfCart.userId
    );

    this.cart[index].quantity = productOfCart.quantity;
  }

  getUserCart(userId: number): CartProps[] {
    return this.cart.filter((cart: CartProps) => cart.userId == userId);
  }

  findByIdProductAndUserId(idProduct: number, userId: number): CartProps {
    const cartFinded = this.cart.find(
      (cart: CartProps) =>
        cart.products.id == idProduct && cart.userId == userId
    );

    if (!cartFinded) {
      throw new Error('Produto não encontrado');
    }

    return cartFinded;
  }

  findIndexByIdProductAndUserId(idProduct: number, userId: number): number {
    const cartFinded = this.cart.findIndex(
      (cart: CartProps) =>
        cart.products.id == idProduct && cart.userId == userId
    );

    if (cartFinded === -1) {
      throw new Error('Produto não encontrado');
    }

    return cartFinded;
  }
}

export default Cart;
