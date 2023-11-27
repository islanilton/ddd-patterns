import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { Address } from '@/domain/customer/value-object/address'
import { Customer } from '@/domain/customer/entity/customer'

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer: Customer = CustomerFactory.create('John Doe')
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John Doe')
  })
  it('should create a customer with address', () => {
    const address: Address = new Address({
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip',
      number: 1,
    })
    const customer: Customer = CustomerFactory.createWithAddress(
      'John Doe',
      address,
    )
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John Doe')
    expect(customer.Address.street).toBe('Street')
    expect(customer.Address.city).toBe('City')
    expect(customer.Address.state).toBe('State')
    expect(customer.Address.zip).toBe('Zip')
    expect(customer.Address.number).toBe(1)
  })
})
