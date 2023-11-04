import { v4 as uuid } from 'uuid'
import { Order } from '@/domain/entity/order'
import { Customer } from '@/domain/entity/customer'
import { OrderItem } from '@/domain/entity/order-item'

export class OrderService {
  static getTotal(orders: Order[]): number {
    return orders.reduce((acc: number, order: Order) => acc + order.total(), 0)
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item')
    }
    const order: Order = new Order({
      id: uuid(),
      customerId: customer.id,
      items,
    })
    customer.addRewardPoints(order.total() / 2)
    return order
  }
}
