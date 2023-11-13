import { OrderRepositoryInterface } from '@/domain/repository/order.repository.interface'
import { Order } from '@/domain/entity/order'
import { OrderModel } from '@/infrastructure/db/sequelize/model/order.model'
import { OrderItem } from '@/domain/entity/order-item'
import { OrderItemModel } from '@/infrastructure/db/sequelize/model'

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

  async find(id: string): Promise<Order | null> {
    const orderModel: OrderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    })

    return new Order({
      id: orderModel.id,
      customerId: orderModel.customer_id,
      items: orderModel.items.map((orderItemModel: OrderItemModel) => {
        return new OrderItem({
          id: orderItemModel.id,
          name: orderItemModel.name,
          price: orderItemModel.price,
          productId: orderItemModel.product_id,
          quantity: orderItemModel.quantity,
        })
      }),
    })
  }

  async findAll(): Promise<Order[]> {
    const ordersModels: OrderModel[] = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    })
    return ordersModels.map((orderModel: OrderModel) => {
      const orderItems: OrderItem[] = orderModel.items.map(
        (orderItemModel: OrderItemModel) => {
          return new OrderItem({
            id: orderItemModel.id,
            name: orderItemModel.name,
            price: orderItemModel.price,
            productId: orderItemModel.product_id,
            quantity: orderItemModel.quantity,
          })
        },
      )
      return new Order({
        id: orderModel.id,
        customerId: orderModel.customer_id,
        items: orderItems,
      })
    })
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
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
        where: {
          id: entity.id,
        },
      },
    )
  }
}
