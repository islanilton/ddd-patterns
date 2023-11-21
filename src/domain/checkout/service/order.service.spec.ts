import { Order } from '@/domain/checkout/entity/order'
import { Product } from '@/domain/product/entity/product'
import { OrderItem } from '@/domain/checkout/entity/order-item'
import { OrderService } from '@/domain/checkout/service/order.service'
import { Address } from '@/domain/customer/value-object/address'
import { Customer } from '@/domain/customer/entity/customer'

describe('Order service unit test', () => {
  it('should place an order', () => {
    const customer: Customer = new Customer({
      id: '1',
      name: 'John Doe',
    })
    customer.Address = new Address({
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip',
      number: 1,
    })

    const item: OrderItem = new OrderItem({
      id: '1',
      name: 'Item 1',
      price: 100,
      quantity: 5,
      productId: '1',
    })

    const order: Order = OrderService.placeOrder(customer, [item])
    expect(customer.rewardPoints).toBe(250)
    expect(order.total()).toBe(500)
  })

  it('should get total of all orders', () => {
    const product1: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    const product2: Product = new Product({
      id: '2',
      name: 'Product 2',
      price: 200,
    })
    const product3: Product = new Product({
      id: '3',
      name: 'Product 3',
      price: 300,
    })

    const orderItem1: OrderItem = new OrderItem({
      id: '1',
      name: 'Item 1',
      price: 100,
      quantity: 2,
      productId: product2.id,
    })
    const orderItem2: OrderItem = new OrderItem({
      id: '2',
      name: 'Item 2',
      price: 200,
      quantity: 1,
      productId: product3.id,
    })

    const orderItem3: OrderItem = new OrderItem({
      id: '3',
      name: 'Item 3',
      price: 300,
      quantity: 3,
      productId: product1.id,
    })

    const order1: Order = new Order({
      id: '1',
      customerId: '1',
      items: [orderItem1, orderItem2],
    })
    const order2: Order = new Order({
      id: '2',
      customerId: '1',
      items: [orderItem3],
    })

    const orders: Order[] = [order1, order2]
    const total: number = OrderService.getTotal(orders)
    expect(total).toBe(1300)
  })
})
