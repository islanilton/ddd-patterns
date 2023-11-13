import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '@/infrastructure/db/sequelize/model/customer.model'
import { CustomerRepository } from '@/infrastructure/repository/customer.repository'
import { Customer } from '@/domain/entity/customer'
import { Address } from '@/domain/entity/address'
import { OrderModel } from '@/infrastructure/db/sequelize/model/order.model'
import { OrderItemModel } from '@/infrastructure/db/sequelize/model/order-item.model'
import { ProductModel } from '@/infrastructure/db/sequelize/model/product.model'
import { ProductRepository } from '@/infrastructure/repository/product.repository'
import { Product } from '@/domain/entity/product'
import { OrderItem } from '@/domain/entity/order-item'
import { Order } from '@/domain/entity/order'
import { OrderRepository } from '@/infrastructure/repository/order.repository'

describe('Order repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async (): Promise<void> => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async (): Promise<void> => {
    await sequelize.close()
  })

  it('should create a order', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    const address: Address = new Address({
      street: 'Rua da Cidade',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    const orderItem: OrderItem = new OrderItem({
      id: '1',
      name: product.name,
      price: product.price,
      quantity: 2,
      productId: product.id,
    })

    const order: Order = new Order({
      id: '1',
      customerId: customer.id,
      items: [orderItem],
    })

    const orderRepository: OrderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel: OrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    })
  })

  it('should update a order', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    const address: Address = new Address({
      street: 'Rua da Cidade',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    const orderItem: OrderItem = new OrderItem({
      id: '1',
      name: product.name,
      price: product.price,
      quantity: 2,
      productId: product.id,
    })
    const order: Order = new Order({
      id: '1',
      customerId: customer.id,
      items: [orderItem],
    })
    const orderRepository: OrderRepository = new OrderRepository()
    await orderRepository.create(order)
    const product2: Product = new Product({
      id: '2',
      name: 'Product 2',
      price: 200,
    })

    const orderItem2: OrderItem = new OrderItem({
      id: '2',
      name: product2.name,
      price: product2.price,
      quantity: 1,
      productId: product2.id,
    })
    order.addItems([orderItem2])
    await orderRepository.update(order)
    const orderModel: OrderModel = await OrderModel.findOne({
      where: { id: order.id },
    })
    expect(orderModel.toJSON().total).toEqual(400)
  })

  it('should find all orders', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    const address: Address = new Address({
      street: 'Rua da Cidade',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    const orderItem: OrderItem = new OrderItem({
      id: '1',
      name: product.name,
      price: product.price,
      quantity: 2,
      productId: product.id,
    })
    const order: Order = new Order({
      id: '1',
      customerId: customer.id,
      items: [orderItem],
    })
    const orderRepository: OrderRepository = new OrderRepository()
    await orderRepository.create(order)
    const foundOrders: Order[] = await orderRepository.findAll()
    expect(foundOrders).toStrictEqual([order])
  })

  it('should find a order', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    const address: Address = new Address({
      street: 'Rua da Cidade',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    const orderItem: OrderItem = new OrderItem({
      id: '1',
      name: product.name,
      price: product.price,
      quantity: 2,
      productId: product.id,
    })
    const order: Order = new Order({
      id: '1',
      customerId: customer.id,
      items: [orderItem],
    })
    const orderRepository: OrderRepository = new OrderRepository()
    await orderRepository.create(order)
    const foundOrder: Order | null = await orderRepository.find(order.id)
    expect(foundOrder).toStrictEqual(order)
  })
})
