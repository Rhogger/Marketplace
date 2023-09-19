import { CartProps } from './Cart';
import { cart } from '../core/factories/controllers/CartFactory';

type OrderProps = {
  id?: number;
  userId: number;
  products: CartProps[];
  date: Date;
  status: string;
};

type GetOrdersProps = {
  id: number;
  userId: number;
};

type UpdateStatusOrderProps = {
  userId: number;
  id: number;
  status: string;
};

type DeleteOrderProps = GetOrdersProps;

class Order {
  private orders: OrderProps[] = [];

  createOrder(order: OrderProps) {
    //TODO: Validar se possui produts no carrinhos

    this.orders.push({
      id: this.orders.length + 1,
      userId: order.userId,
      products: this.findCartByUserId(order.userId),
      date: new Date(),
      status: 'processando',
    });
  }

  getOrder(order: GetOrdersProps) {
    const index = this.findByIndex(order.id, order.userId);

    return this.orders[index];
  }

  getOrders(userId: number) {
    const allOrders = this.orders.filter(
      (order: OrderProps) => order.userId == userId
    );

    if (!this.orders) {
      throw new Error('Não existe pedidos realizados para esse usuário!');
    }

    return allOrders;
  }

  updateStatusOrder(order: UpdateStatusOrderProps) {
    const index = this.findByIndex(order.id, order.userId);

    this.orders[index].status = order.status;
  }

  deleteOrder(order: DeleteOrderProps) {
    const index = this.findByIndex(order.id, order.userId);

    this.orders.splice(index, 1);
  }

  findById(id: number, userId: number) {
    console.log(id);
    console.log(userId);

    return this.orders.find(
      (order: OrderProps) => order.id == id && order.userId == userId
    );
  }

  findByIndex(id: number, userId: number) {
    const orderFinded = this.orders.findIndex(
      (order: OrderProps) => order.id == id && order.userId == userId
    );

    if (orderFinded === -1) {
      throw new Error('Pedido não encontrado!');
    }

    return orderFinded;
  }

  findCartByUserId(userId: number): CartProps[] {
    const cartFinded = cart.getUserCart(userId);

    return cartFinded;
  }
}

export default Order;
