import { v4 as uuid } from 'uuid'
import { OrderFactory } from '@/domain/checkout/factory/order.factory'
import { Order } from '@/domain/checkout/entity/order'

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          price: 100,
          quantity: 1,
          productId: uuid(),
        },
      ],
    }

    const order: Order = OrderFactory.create(orderProps)
    expect(order.id).toBe(orderProps.id)
    expect(order.customerId).toBe(orderProps.customerId)
    expect(order.items.length).toBe(1)
  })
})
