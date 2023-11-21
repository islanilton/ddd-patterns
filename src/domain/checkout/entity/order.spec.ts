import { Order } from '@/domain/checkout/entity/order'
import { OrderItem } from '@/domain/checkout/entity/order-item'

describe('Order unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order: Order = new Order({
        id: '',
        customerId: '1',
        items: [],
      })
    }).toThrowError('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order: Order = new Order({
        id: '1',
        customerId: '',
        items: [],
      })
    }).toThrowError('CustomerId is required')
  })

  it('should throw error when items is empty', () => {
    expect(() => {
      const order: Order = new Order({
        id: '1',
        customerId: '1',
        items: [],
      })
    }).toThrowError('Items quantity is must be greater than 0')
  })

  it('should calculate total', () => {
    const item1: OrderItem = new OrderItem({
      id: '1',
      name: 'Item 1',
      price: 100,
      quantity: 2,
      productId: '1',
    })
    const item2: OrderItem = new OrderItem({
      id: '2',
      name: 'Item 2',
      price: 200,
      quantity: 1,
      productId: '2',
    })

    const order: Order = new Order({
      id: '1',
      customerId: '1',
      items: [item1, item2],
    })

    const total: number = order.total()
    expect(total).toBe(400)
  })

  it('should throw error if the item quantity is less or equal zero', () => {
    expect(() => {
      const item: OrderItem = new OrderItem({
        id: '1',
        name: 'Item 1',
        price: 100,
        quantity: 0,
        productId: '1',
      })

      const order: Order = new Order({
        id: '1',
        customerId: '1',
        items: [item],
      })
    }).toThrowError('Quantity must be greater than 0')
  })
})
