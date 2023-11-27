import { Order } from '@/domain/checkout/entity/order'
import { OrderItem } from '@/domain/checkout/entity/order-item'

interface OrderFactoryProps {
  id: string
  customerId: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    productId: string
  }[]
}

export class OrderFactory {
  static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
      })
    })

    return new Order({
      id: props.id,
      customerId: props.customerId,
      items,
    })
  }
}
