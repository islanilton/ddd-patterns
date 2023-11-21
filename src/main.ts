import { Customer } from '@/domain/customer/entity/customer'
import { Address } from '@/domain/customer/value-object/address'
import { OrderItem } from '@/domain/checkout/entity/order-item'
import { Order } from '@/domain/checkout/entity/order'

const customer: Customer = new Customer({
  id: '1',
  name: 'John Doe',
})
const address: Address = new Address({
  street: 'Street',
  city: 'City',
  state: 'State',
  zip: 'Zip',
  number: 1,
})
customer.Address = address
customer.activate()

const item1: OrderItem = new OrderItem({
  id: '1',
  name: 'Item 1',
  price: 10,
  quantity: 1,
  productId: '1',
})
const item2: OrderItem = new OrderItem({
  id: '2',
  name: 'Item 2',
  price: 20,
  quantity: 1,
  productId: '2',
})
const order: Order = new Order({
  id: '1',
  customerId: customer.id,
  items: [item1, item2],
})

console.log(order)
