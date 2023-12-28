import { CreateCustomerUseCase } from './create.customer.usecase'

const input = {
  name: 'John Doe',
  address: {
    street: 'Main Street',
    city: 'New York',
    number: 123,
    zip: '123456',
    state: 'NY',
  },
}

const MockCustomerRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
})

describe('Unit Test Create Customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)
    const output = await sut.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
        state: input.address.state,
      },
    })
  })
})
