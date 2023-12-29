import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { Address } from '@/domain/customer/value-object/address'
import { UpdateCustomerUseCase } from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address({
    city: 'New York',
    number: 123,
    state: 'NY',
    street: 'Main Street',
    zip: '123456',
  }),
)

const input = {
  id: customer.id,
  name: 'John Doe Updated',
  address: {
    street: 'Main Street Updated',
    city: 'New York Updated',
    number: 1235,
    zip: '123456',
    state: 'NY',
  },
}

const MockCustomerRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
})

describe('Unit Test Update Customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new UpdateCustomerUseCase(customerRepository)
    const output = await sut.execute(input)
    expect(output).toEqual(input)
  })
})
