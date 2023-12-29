import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { Address } from '@/domain/customer/value-object/address'
import { ListCustomerUseCase } from './list.customer.usecase'

const customer1 = CustomerFactory.createWithAddress(
  'John Doe',
  new Address({
    street: 'Main Street',
    city: 'New York',
    number: 123,
    zip: '123456',
    state: 'NY',
  }),
)

const customer2 = CustomerFactory.createWithAddress(
  'Diana Doe',
  new Address({
    street: 'Main Street 2',
    city: 'New York 2',
    number: 1235,
    zip: '123456',
    state: 'NY',
  }),
)

const MockCustomerRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
})

describe('Unit Test List Customer use case', () => {
  it('should list all customers', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new ListCustomerUseCase(customerRepository)
    const output = await sut.execute()
    expect(output.customers.length).toEqual(2)
    expect(output.customers[0].id).toEqual(customer1.id)
    expect(output.customers[0].name).toEqual(customer1.name)
    expect(output.customers[0].address.street).toEqual(customer1.Address.street)

    expect(output.customers[1].id).toEqual(customer2.id)
    expect(output.customers[1].name).toEqual(customer2.name)
    expect(output.customers[1].address.street).toEqual(customer2.Address.street)
  })
})
