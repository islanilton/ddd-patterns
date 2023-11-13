import { OrderRepositoryInterface } from '@/domain/repository/order.repository.interface'
import { Order } from '@/domain/entity/order'
import { OrderModel } from '@/infrastructure/db/sequelize/model/order.model'
import { OrderItem } from '@/domain/entity/order-item'
import { OrderItemModel } from '@/infrastructure/db/sequelize/model/order-item.model'

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item: OrderItem) => ({
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    )
  }

  find(id: string): Promise<Order | null> {
    return Promise.resolve(undefined)
  }

  findAll(): Promise<Order[]> {
    return Promise.resolve([])
  }

  update(entity: Order): Promise<void> {
    return Promise.resolve(undefined)
  }
}
